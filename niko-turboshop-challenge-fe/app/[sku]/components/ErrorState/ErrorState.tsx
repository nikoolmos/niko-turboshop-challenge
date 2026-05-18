import React from 'react';

export interface ErrorStateProps {
    message: string
    onRetry: () => void,
    title: string,
};

export function ErrorState(props: ErrorStateProps) {
    const { message,
        onRetry,
        title, } = props;

    // Inline styles to keep it library-free and self-contained
    const containerStyle: React.CSSProperties = {
        padding: '20px',
        margin: '10px 0',
        borderRadius: '8px',
        backgroundColor: '#fef2f2',
        border: '1px solid #fecaca',
        color: '#991b1b',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '8px'
    };

    const buttonStyle: React.CSSProperties = {
        marginTop: '8px',
        padding: '8px 16px',
        backgroundColor: '#991b1b',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '14px'
    };

    return (
        <div role="alert" style={containerStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* Simple SVG Error Icon */}
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <strong style={{ fontSize: '16px' }}>{title}</strong>
            </div>

            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5' }}>{message}</p>

            {onRetry && (
                <button
                    onClick={onRetry}
                    style={buttonStyle}
                    // onMouseOver={(e) => e.target.style.backgroundColor = '#7f1d1d'}
                    // onMouseOut={(e) => e.target.style.backgroundColor = '#991b1b'}
                >
                    Try Again
                </button>
            )}
        </div>
    );
};
