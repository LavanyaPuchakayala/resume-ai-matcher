import { useState } from 'react'

function App() {
  const [query, setQuery] = useState("")
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const [resume, setResume] = useState(null)
  const [darkMode, setDarkMode] = useState(false)

  const handleSearch = async () => {
    if (!query) return alert("Please type a job")
    setLoading(true)
    setJobs([])
    
    setTimeout(() => {
      setJobs([
        {job_id: "1", job_title: "Python Developer", employer_name: "TCS", job_city: "Bangalore", job_country: "India", job_employment_type: "Full-time", job_apply_link: "https://google.com", skills: ["Python", "Django", "SQL"]},
        {job_id: "2", job_title: "Senior Python Engineer", employer_name: "Infosys", job_city: "Bangalore", job_country: "India", job_employment_type: "Full-time", job_apply_link: "https://google.com", skills: ["Python", "AWS", "Docker"]},
        {job_id: "3", job_title: "Python Backend Developer", employer_name: "Wipro", job_city: "Bangalore", job_country: "India", job_employment_type: "Remote", job_apply_link: "https://google.com", skills: ["Python", "FastAPI", "MongoDB"]},
        {job_id: "4", job_title: "Django Developer", employer_name: "Accenture", job_city: "Bangalore", job_country: "India", job_employment_type: "Full-time", job_apply_link: "https://google.com", skills: ["Django", "React", "PostgreSQL"]},
        {job_id: "5", job_title: "Python Data Engineer", employer_name: "Capgemini", job_city: "Bangalore", job_country: "India", job_employment_type: "Full-time", job_apply_link: "https://google.com", skills: ["Python", "Pandas", "Spark"]}
      ])
      setLoading(false)
    }, 1000)
  }

  const getMatchPercentage = (jobSkills) => {
    if (!resume) return null
    return Math.floor(Math.random() * 25) + 70
  }

  const handleFileUpload = (e) => {
    setResume(e.target.files[0])
    alert("Resume uploaded: " + e.target.files[0].name)
  }

  // Theme colors
  const bgColor = darkMode? '#1a1a1a' : '#f5f5f5'
  const cardColor = darkMode? '#2d2d2d' : 'white'
  const textColor = darkMode? '#e0e0e0' : '#333'
  const subTextColor = darkMode? '#aaa' : '#555'

  return (
    <div style={{padding: '20px', fontFamily: 'Arial', maxWidth: '900px', margin: '0 auto', background: bgColor, minHeight: '100vh', color: textColor}}>
      
      {/* Header with Dark Mode Toggle */}
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1 style={{textAlign: 'center', color: '#2563eb', flex: 1}}>Naukri AI Recruiter 🤖</h1>
        <button 
          onClick={() => setDarkMode(!darkMode)} 
          style={{padding: '8px 16px', background: darkMode? '#fbbf24' : '#1e293b', color: darkMode? 'black' : 'white', border: 'none', borderRadius: '8px', cursor: 'pointer'}}>
          {darkMode? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>

      {/* Resume Upload Section */}
      <div style={{background: cardColor, padding: '15px', borderRadius: '10px', marginBottom: '20px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.2)'}}>
        <b>Step 1: Upload Resume</b>
        <input type="file" accept=".pdf,.docx" onChange={handleFileUpload} style={{marginLeft: '10px', color: textColor}} />
        {resume && <p style={{color: '#10b981'}}>✅ {resume.name} uploaded</p>}
      </div>

      {/* Search Section */}
      <div style={{display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px'}}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="python developer bangalore"
          style={{padding: '12px', width: '400px', borderRadius: '8px', border: `1px solid ${darkMode? '#555' : '#ccc'}`, fontSize: '16px', background: cardColor, color: textColor}}
        />
        <button onClick={handleSearch} style={{padding: '12px 24px', cursor: 'pointer', background: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px'}}>Search</button>
      </div>

      {loading && <p style={{textAlign: 'center', fontSize: '18px'}}>Loading jobs...</p>}

      <div>
        {jobs.length === 0 &&!loading && <p style={{textAlign: 'center', color: subTextColor}}>Upload resume and search for jobs</p>}
        
        {jobs.map((job) => (
          <div key={job.job_id} style={{border: `1px solid ${darkMode? '#444' : '#ddd'}`, padding: '20px', marginBottom: '15px', borderRadius: '10px', background: cardColor, boxShadow: '0 2px 4px rgba(0,0,0,0.2)'}}>
            
            {resume && (
              <div style={{float: 'right', background: '#10b981', color: 'white', padding: '5px 12px', borderRadius: '20px', fontWeight: 'bold'}}>
                {getMatchPercentage(job.skills)}% Match
              </div>
            )}

            <h3 style={{margin: '0 0 8px 0', color: '#3b82f6'}}>{job.job_title}</h3>
            <p style={{margin: '0 0 5px 0', color: textColor, fontWeight: 'bold'}}>{job.employer_name}</p>
            <p style={{margin: '0 0 8px 0', color: subTextColor}}>{job.job_city}, {job.job_country} | {job.job_employment_type}</p>
            <p style={{margin: '0 0 15px 0', color: subTextColor}}><b>Skills:</b> {job.skills.join(', ')}</p>
            
            <a href={job.job_apply_link} target="_blank" style={{padding: '8px 16px', background: '#2563eb', color: 'white', textDecoration: 'none', borderRadius: '5px', display: 'inline-block'}}>Apply Now →</a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App