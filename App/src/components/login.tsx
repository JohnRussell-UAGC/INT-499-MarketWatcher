import { type GoogleCredentialResponse, GoogleLogin } from "@react-oauth/google";
import { handleGoogleLogin } from "../services/authService.tsx";

interface LoginProps {
    onLoginSuccess: () => void;
}

const Login = ({ onLoginSuccess }: LoginProps) => {
    const handleSuccess = async (credentialResponse: GoogleCredentialResponse) => {
        try {
            const result = await handleGoogleLogin(credentialResponse);
            if (result.success) {
                onLoginSuccess();
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="login-container">
            <h1>Welcome to MarketWatcher</h1>
            <div className="login-box">
                <h2>Sign in</h2>
                <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={() => console.log('Login Failed')}
                    useOneTap={false}
                    theme="filled_blue"
                    shape="rectangular"
                    width={300}
                    text="signin_with"
                    auto_select={false}
                />
            </div>
        </div>
    );
};

export default Login;