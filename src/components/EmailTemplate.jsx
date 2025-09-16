// components/EmailTemplate.js
export const EmailTemplate = ({ otpCode }) => (
  <div
    style={{
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      backgroundColor: '#f4f4f4',
      borderRadius: '5px',
      maxWidth: '600px',
      margin: '0 auto',
    }}
  >
    <h1 style={{ color: '#333' }}>Your One-Time Password (OTP)</h1>
    <p style={{ color: '#555' }}>
      Thank you for using our service. Please find your One-Time Password (OTP)
      below:
    </p>
    <h2 style={{ color: '#007bff' }}>{otpCode}</h2>
    <p style={{ color: '#555' }}>
      This code is valid for 10 minutes. Please do not share it with anyone.
    </p>
    <p style={{ color: '#555' }}>
      If you did not request this code, please ignore this email.
    </p>
    <footer style={{ marginTop: '20px', fontSize: '14px', color: '#777' }}>
      <p>Best regards,</p>
      <p>{process.env.APPNAME}</p>
    </footer>
  </div>
)
