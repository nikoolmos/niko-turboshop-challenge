export function Loader({ size = 40, color = '#3b82f6' }) {
  const spinTransition = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <style>{spinTransition}</style>
      <div
        style={{
          width: size,
          height: size,
          border: '4px solid rgba(0,0,0,0.1)',
          borderTop: `4px solid ${color}`,
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }}
      />
    </div>
  );
};