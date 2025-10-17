function PatientCard({ patient, onView }) {
  return (
    <div className="card" role="article" aria-labelledby={`patient-${patient.id}-name`}>
      <h3 id={`patient-${patient.id}-name`}>{patient.name}</h3>
      <div className="muted">Age: {patient.age}</div>
      <div className="muted">Contact: {patient.contact}</div>
      <div className="actions">
        <button className="button" onClick={() => onView(patient)}>View Details</button>
      </div>
    </div>
  )
}

export default PatientCard
