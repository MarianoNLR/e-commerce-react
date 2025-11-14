import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthGoogleSuccessPage.css';

export default function AuthGoogleSuccessPage() {
    
    const navigate = useNavigate();
    
    useEffect(() => {
        // Redirect or perform any necessary actions after successful authentication
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const state = urlParams.get('state');

        if (token) {
            // localStorage.setItem('access_token', JSON.stringify({ token }));
            console.log('Google authentication successful, token stored: ', token);
            navigate('/login', { state: { googleStateAuth: {token, state} }});
        } else {
            navigate('/login');
        }
        
    }, [navigate]);

    return (
        <>
        </>
    )
}