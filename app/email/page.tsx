export default function TemplateEmail() {
  return (
    <div style={{}}>

      <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: 'auto', padding: '20px', border: '1px solid #ddd', borderRadius: '10px' }}>
        <header style={{}}>
          <a href="">
            <img style={{ width: '128px' }} src="https://timetogo-pictures.s3.ap-southeast-2.amazonaws.com/logo.png" alt="Time to go" />
          </a>
        </header>
        <h2 style={{ color: '#ff6600', textAlign: 'center', marginBottom: '10px' }}>✈️ Limited-Time Flight Deal!</h2>
        <p style={{ textAlign: 'center', fontSize: '16px', color: '#333', marginBottom: '10px' }}>A flight from <strong>Madrid</strong> to <strong>Madrid</strong> is available!</p>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',  /* Ensure full width */
          borderRadius: '8px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
        }}>
          {/* Flight Details (Left Side) */}
          <div style={{
            display: 'flex',
            flex: 1,  /* Allow to expand */
            flexDirection: 'column',
            gap: '10px',
            borderBottom: '2px solid black'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {/* Departure Info */}
              <div style={{ display: 'flex', flexDirection: 'column', padding: '8px 16px 0 16px' }}>
                <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>12:00</p>
                <p style={{ fontSize: '14px', color: '#333' }}>MAD</p>
                <p style={{ fontSize: '14px', color: '#333', whiteSpace: 'nowrap' }}>14 March</p>
              </div>

              {/* Flight Route */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '10px', height: '10px', backgroundColor: 'white', border: '2px solid black', borderRadius: '50%' }}></div>
                  <div style={{ width: '36px', height: '2px', backgroundColor: 'black' }}></div>
                  <div style={{ backgroundColor: '#2E7D32', color: 'white', padding: '6px 12px', borderRadius: '10px', fontSize: '14px', fontWeight: 'bold' }}>Aktarmasız</div>
                  <div style={{ width: '36px', height: '2px', backgroundColor: 'black' }}></div>
                  <div style={{ width: '10px', height: '10px', backgroundColor: 'white', border: '2px solid black', borderRadius: '50%' }}></div>
                </div>
                <p style={{ textAlign: 'center', fontSize: '14px', color: 'black', marginTop: '4px' }}>2 sa 10 dk</p>
              </div>

              {/* Arrival Info */}
              <div style={{ display: 'flex', flexDirection: 'column', padding: '8px 16px 0 16px', alignItems: 'end' }}>
                <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>14:10</p>
                <p style={{ fontSize: '14px', color: '#333' }}>MAD</p>
                <p style={{ fontSize: '14px', color: '#333', textAlign: 'end', whiteSpace: 'nowrap' }}>14 March</p>
              </div>
            </div>

            <div style={{ padding: '4px 16px' }}>Airline</div>
          </div>

          {/* Price & Book Button (Right Side) */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-end',
            flex: 0.3,  /* Reduce width of price section */
            padding: '8px 12px'
          }}>
            <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#333', padding: '0 0 10px 0' }}>$33</p>
            <a style={{ width: '100%' }} href="#">
              <button style={{ width: '100%', padding: '8px 16px', backgroundColor: '', color: 'blue', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold', border: '1px solid blue', cursor: 'pointer' }}>
                Book Now!
              </button>
            </a>
          </div>
        </div>


        <p style={{ marginTop: '20px', fontSize: '14px', color: '#555', textAlign: 'center' }}>
          Prices change quickly! Secure your seat now before the deal expires.
        </p>

        <p style={{ marginTop: '20px', fontSize: '12px', color: '#555', textAlign: 'start' }}>
          Click if you don&apos;t want to receive flight deals for this destination. <a style={{ color: 'blue', textDecoration: 'underline' }} href="#">Unsubscribe</a>
        </p>
      </div>
    </div>
  );
}