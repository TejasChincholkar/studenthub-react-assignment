
import { useState } from 'react'
import './App.css'

const initialForm = {
  name: '',
  email: '',
  phone: '',
  gender: '',
  course: '',
  password: '',
  confirmPassword: '',
}

function validateForm(form) {
  const errors = {}

  if (!form.name.trim() || form.name.trim().length < 2) {
    errors.name = 'Please enter a name with at least 2 characters.'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
    errors.phone = 'Enter a valid 10-digit Indian mobile number.'
  }

  if (!form.gender) {
    errors.gender = 'Please select your gender.'
  }

  if (!form.course) {
    errors.course = 'Please select a course.'
  }

  if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(form.password)
  ) {
    errors.password =
      'Use at least 8 characters, including uppercase, lowercase, and a number.'
  }

  if (form.confirmPassword !== form.password) {
    errors.confirmPassword = 'Passwords do not match.'
  }

  return errors
}

function App() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [students, setStudents] = useState([])
  const [search, setSearch] = useState('')
  const [notice, setNotice] = useState(null)

  function handleChange(event) {
    const { name, value } = event.target

    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setNotice(null)
  }

  function handleSubmit(event) {
    event.preventDefault()

    const validationErrors = validateForm(form)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      setNotice({
        type: 'error',
        text: 'Please correct the highlighted fields.',
      })
      return
    }

    const normalizedEmail = form.email.trim().toLowerCase()

    if (
      students.some(
        (student) => student.email.toLowerCase() === normalizedEmail,
      )
    ) {
      setErrors({ email: 'This email is already registered.' })
      setNotice({
        type: 'error',
        text: 'A student with this email already exists.',
      })
      return
    }

    const newStudent = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: form.name.trim(),
      email: normalizedEmail,
      phone: form.phone.trim(),
      gender: form.gender,
      course: form.course,
    }

    setStudents((current) => [newStudent, ...current])
    setForm(initialForm)
    setErrors({})
    setNotice({
      type: 'success',
      text: `${newStudent.name} has been registered successfully!`,
    })
  }

  function handleDelete(id) {
    setStudents((current) => current.filter((student) => student.id !== id))
    setNotice({ type: 'success', text: 'Student removed successfully.' })
  }

  const filteredStudents = students.filter((student) => {
    const query = search.trim().toLowerCase()

    return (
      student.name.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query) ||
      student.course.toLowerCase().includes(query)
    )
  })

  function fieldClass(field) {
    return errors[field] ? 'form-control invalid' : 'form-control'
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="StudentHub home">
          <span className="brand-mark">S</span>
          <span>Student<span className="brand-accent">Hub</span></span>
        </a>
        <nav>
          <a href="#register">Register</a>
          <a href="#directory">Student directory</a>
        </nav>
        <a className="nav-cta" href="#register">Get started ↗</a>
      </header>

      <main id="home">
        <section className="hero">
          <div className="hero-content">
            <span className="eyebrow">
              YOUR CAMPUS, ORGANIZED
            </span>
            <h1>
              Your next chapter
              <br />
              starts <span>right here.</span>
            </h1>
            <p className="hero-description">
              A simple space to register, organize, and manage your
              student community. Everything starts with one small step.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#register">
                Register a student <span>↗</span>
              </a>
              <a className="secondary-button" href="#directory">
                Explore directory ↓
              </a>
            </div>
            <div className="hero-note">
              <span className="online-dot" />
              Simple. Organized. Student-focused.
            </div>
          </div>

          <div className="hero-art" aria-label="StudentHub registration dashboard preview">
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <div className="floating-card card-top">
              <span className="mini-icon purple">✦</span>
              <span>
                <strong>Make it official</strong>
                <small>Your student journey begins</small>
              </span>
            </div>
            <div className="dashboard-card">
              <div className="dashboard-head">
                <div>
                  <small>STUDENT PORTAL</small>
                  <h3>Welcome aboard!</h3>
                </div>
                <span className="dashboard-avatar">S</span>
              </div>
              <div className="dashboard-banner">
                <div className="banner-symbol">✳</div>
                <div>
                  <strong>Your future, in progress.</strong>
                  <p>One profile. New possibilities.</p>
                </div>
              </div>
              <div className="dashboard-label">YOUR QUICK OVERVIEW</div>
              <div className="dashboard-stats">
                <div className="stat-card">
                  <span className="stat-icon">♙</span>
                  <strong>{students.length}</strong>
                  <small>Students</small>
                </div>
                <div className="stat-card">
                  <span className="stat-icon green">✓</span>
                  <strong>Ready</strong>
                  <small>Registration</small>
                </div>
              </div>
              <div className="dashboard-progress">
                <span>Ready to get started</span>
                <span className="progress-pill">Let's go ↗</span>
              </div>
            </div>
            <div className="floating-card card-bottom">
              <span className="mini-icon green">✓</span>
              <span>
                <strong>You're on your way</strong>
                <small>Build your student profile</small>
              </span>
            </div>
            <span className="art-spark spark-one">✳</span>
            <span className="art-spark spark-two">✦</span>
          </div>
        </section>

        <section className="benefits">
          <div className="benefit">
            <span className="benefit-icon">01</span>
            <div>
              <strong>Easy registration</strong>
              <p>A clear form with helpful validation.</p>
            </div>
          </div>
          <div className="benefit">
            <span className="benefit-icon">02</span>
            <div>
              <strong>Organized directory</strong>
              <p>Find students by name, email, or course.</p>
            </div>
          </div>
          <div className="benefit">
            <span className="benefit-icon">03</span>
            <div>
              <strong>Instant feedback</strong>
              <p>See success and error messages immediately.</p>
            </div>
          </div>
        </section>

        <section className="workspace" id="register">
          <div className="section-heading">
            <div>
              <span className="eyebrow">LET'S GET YOU STARTED</span>
              <h2>Student registration</h2>
              <p>Fill in the details below to create a student profile.</p>
            </div>
            <span className="step-badge">STEP 01 / REGISTER</span>
          </div>

          {notice && (
            <div
              className={`notice ${notice.type}`}
              role={notice.type === 'error' ? 'alert' : 'status'}
            >
              <span>{notice.type === 'success' ? '✓' : '!'}</span>
              {notice.text}
            </div>
          )}

          <form className="registration-form" onSubmit={handleSubmit} noValidate>
            <div className="form-section-title">
              <span className="section-number">01</span>
              <div>
                <h3>Personal information</h3>
                <p>Tell us a little about yourself.</p>
              </div>
            </div>

            <div className="form-grid">
              <div className="field">
                <label htmlFor="name">Full name <span>*</span></label>
                <input
                  className={fieldClass('name')}
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Tejas Chincholkar"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                />
                {errors.name && <small className="error-text">{errors.name}</small>}
              </div>

              <div className="field">
                <label htmlFor="email">Email address <span>*</span></label>
                <input
                  className={fieldClass('email')}
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && <small className="error-text">{errors.email}</small>}
              </div>

              <div className="field">
                <label htmlFor="phone">Mobile number <span>*</span></label>
                <input
                  className={fieldClass('phone')}
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  autoComplete="tel"
                  aria-invalid={Boolean(errors.phone)}
                />
                {errors.phone && <small className="error-text">{errors.phone}</small>}
              </div>

              <div className="field">
                <label htmlFor="gender">Gender <span>*</span></label>
                <select
                  className={fieldClass('gender')}
                  id="gender"
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.gender)}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
                {errors.gender && <small className="error-text">{errors.gender}</small>}
              </div>

              <div className="field full-width">
                <label htmlFor="course">Course / program <span>*</span></label>
                <select
                  className={fieldClass('course')}
                  id="course"
                  name="course"
                  value={form.course}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.course)}
                >
                  <option value="">Choose your course</option>
                  <option value="Computer Engineering">Computer Engineering</option>
                  <option value="Software Engineering">Software Engineering</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Artificial Intelligence & ML">Artificial Intelligence &amp; ML</option>
                  <option value="Electronics Engineering">Electronics Engineering</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Other">Other</option>
                </select>
                {errors.course && <small className="error-text">{errors.course}</small>}
              </div>
            </div>

            <div className="form-section-title security-title">
              <span className="section-number">02</span>
              <div>
                <h3>Account security</h3>
                <p>Create a strong password for your profile.</p>
              </div>
            </div>

            <div className="form-grid">
              <div className="field">
                <label htmlFor="password">Password <span>*</span></label>
                <input
                  className={fieldClass('password')}
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  aria-invalid={Boolean(errors.password)}
                />
                {errors.password && <small className="error-text">{errors.password}</small>}
                <small className="field-hint">Include uppercase, lowercase, and a number.</small>
              </div>

              <div className="field">
                <label htmlFor="confirmPassword">Confirm password <span>*</span></label>
                <input
                  className={fieldClass('confirmPassword')}
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  aria-invalid={Boolean(errors.confirmPassword)}
                />
                {errors.confirmPassword && <small className="error-text">{errors.confirmPassword}</small>}
              </div>
            </div>

            <div className="form-footer">
              <p><span>*</span> Required fields. Passwords are not saved in the student directory.</p>
              <button className="primary-button submit-button" type="submit">
                Create student profile <span>↗</span>
              </button>
            </div>
          </form>
        </section>

        <section className="directory" id="directory">
          <div className="section-heading directory-heading">
            <div>
              <span className="eyebrow">YOUR CAMPUS COMMUNITY</span>
              <h2>Student directory</h2>
              <p>Manage registered student profiles in one place.</p>
            </div>
            <div className="total-badge">
              <strong>{students.length}</strong>
              <span>{students.length === 1 ? 'STUDENT' : 'STUDENTS'}</span>
            </div>
          </div>

          <div className="directory-toolbar">
            <label className="search-box">
              <span aria-hidden="true">⌕</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search name, email, or course..."
                aria-label="Search students"
              />
              {search && (
                <button type="button" className="clear-search" onClick={() => setSearch('')}>
                  Clear
                </button>
              )}
            </label>
            <span className="result-count">
              Showing {filteredStudents.length} of {students.length}
            </span>
          </div>

          {filteredStudents.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">♙</div>
              <h3>{search ? 'No matching students' : 'Your directory starts here'}</h3>
              <p>
                {search
                  ? 'Try another name, email address, or course.'
                  : 'Register your first student to see their profile listed here.'}
              </p>
              {search ? (
                <button className="secondary-button" type="button" onClick={() => setSearch('')}>
                  Clear search
                </button>
              ) : (
                <a className="secondary-button" href="#register">Register a student ↗</a>
              )}
            </div>
          ) : (
            <div className="student-list">
              {filteredStudents.map((student) => (
                <article className="student-card" key={student.id}>
                  <div className="student-avatar">
                    {student.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="student-details">
                    <h3>{student.name}</h3>
                    <p>{student.email}</p>
                    <div className="student-meta">
                      <span>{student.course}</span>
                      <span>{student.phone}</span>
                      <span>{student.gender}</span>
                    </div>
                  </div>
                  <button
                    className="delete-button"
                    type="button"
                    onClick={() => handleDelete(student.id)}
                    aria-label={`Delete ${student.name}`}
                  >
                    Delete
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-mark">S</span>
          <span>Student<span className="brand-accent">Hub</span></span>
        </a>
        <p>Made for students, built for a simpler campus experience.</p>
        <a href="#home">Back to top ↑</a>
      </footer>
    </div>
  )
}

export default App
