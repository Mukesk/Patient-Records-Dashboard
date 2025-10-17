import { useEffect, useMemo, useState } from 'react'
import PatientCard from '../components/PatientCard.jsx'
import Modal from '../components/Modal.jsx'

function deterministicAge(id) {
  return 20 + (id * 7) % 50
}

function Patients() {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const [form, setForm] = useState({ name: '', age: '', contact: '' })

  useEffect(() => {
    let active = true
    async function fetchPatients() {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`)
        const data = await res.json()
        const mapped = data.map((u) => ({
          id: u.id,
          name: u.name,
          age: deterministicAge(u.id),
          contact: u.phone,
          email: u.email,
          username: u.username,
          website: u.website,
          company: u.company?.name,
          address: [u.address?.suite, u.address?.street, u.address?.city].filter(Boolean).join(', '),
        }))
        if (active) setPatients(mapped)
      } catch (e) {
        if (active) setError(e.message || 'Something went wrong')
      } finally {
        if (active) setLoading(false)
      }
    }
    fetchPatients()
    return () => { active = false }
  }, [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return patients
    return patients.filter((p) => p.name.toLowerCase().includes(q))
  }, [patients, search])

  function onSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.age || !form.contact) return
    const newP = {
      id: Date.now(),
      name: form.name,
      age: Number(form.age),
      contact: form.contact,
    }
    setPatients((prev) => [newP, ...prev])
    setForm({ name: '', age: '', contact: '' })
  }

  return (
    <section>
      <div className="toolbar">
        <input
          className="input"
          placeholder="Search patients by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search patients"
        />
        <span className="muted">{filtered.length} result{filtered.length === 1 ? '' : 's'}</span>
      </div>

      <form className="form" onSubmit={onSubmit}>
        <div className="field name">
          <label className="label" htmlFor="name">Name</label>
          <input id="name" className="input" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
        </div>
        <div className="field age">
          <label className="label" htmlFor="age">Age</label>
          <input id="age" type="number" min="0" className="input" value={form.age} onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))} />
        </div>
        <div className="field contact">
          <label className="label" htmlFor="contact">Contact</label>
          <input id="contact" className="input" value={form.contact} onChange={(e) => setForm((f) => ({ ...f, contact: e.target.value }))} />
        </div>
        <div className="row" style={{ padding: '0 1rem 1rem' }}>
          <button className="button" type="submit">Add New Patient</button>
        </div>
      </form>

      {loading && <p className="spinner">Loading patients...</p>}
      {error && <p role="alert" style={{ color: '#fca5a5' }}>Error: {error}</p>}

      {!loading && !error && (
        <div className="grid" role="list">
          {filtered.map((p) => (
            <PatientCard key={p.id} patient={p} onView={setSelected} />
          ))}
        </div>
      )}

      {selected && (
        <Modal title={selected.name} onClose={() => setSelected(null)}>
          <div className="muted">Age: {selected.age ?? '—'}</div>
          {selected.username && <div className="muted">Username: {selected.username}</div>}
          {selected.email && <div className="muted">Email: {selected.email}</div>}
          {selected.contact && <div className="muted">Phone: {selected.contact}</div>}
          {selected.company && <div className="muted">Company: {selected.company}</div>}
          {selected.address && <div className="muted">Address: {selected.address}</div>}
          {selected.website && (
            <div className="muted">Website: <a href={`https://${selected.website}`} target="_blank" rel="noreferrer">{selected.website}</a></div>
          )}
        </Modal>
      )}
    </section>
  )
}

export default Patients
