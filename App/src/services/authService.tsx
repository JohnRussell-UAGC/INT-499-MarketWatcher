import { type GoogleCredentialResponse } from "@react-oauth/google";

interface AuthResponse {
    success: boolean;
    user: {
        email: string;
        name: string;
        picture: string;
    };
}

export const handleGoogleLogin = async (response: GoogleCredentialResponse): Promise<AuthResponse> => {
    try {
        if (!response.credential) {
            throw new Error('No credential received from Google');
        }

        // Send the credential to your backend
        const backendResponse = await fetch('http://localhost:7123/api/Auth/callback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                credential: response.credential
            })
        });

        if (!backendResponse.ok) {
            throw new Error(`Backend request failed: ${backendResponse.statusText}`);
        }

        const serverResponse = await backendResponse.json();
        console.log('Server response:', serverResponse);

        // Store the token after backend verification
        localStorage.setItem('google_token', response.credential);

        const payload = JSON.parse(atob(response.credential.split('.')[1]));
        console.log('Decoded token payload:', payload);

        return {
            success: true,
            user: {
                email: payload.email,
                name: payload.name,
                picture: payload.picture
            }
        };
    } catch (error) {
        console.error('Error handling Google login:', error);
        throw error;
    }
};