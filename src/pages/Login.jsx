import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const calculatePasswordStrength = (password) => {
    if (!password) {
      return {
        text: "",
        className: "",
      };
    }

    let score = 0;

    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) {
      return {
        text: "Weak",
        className: "weak",
      };
    }

    if (score <= 3) {
      return {
        text: "Medium",
        className: "medium",
      };
    }

    return {
      text: "Strong",
      className: "strong",
    };
  };

  const passwordStrength = calculatePasswordStrength(password);

  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (!username.trim()) {
      setError("Username is required.");
      return;
    }

    if (username.trim().length < 3) {
      setError("Username must contain at least 3 characters.");
      return;
    }

    if (!password) {
      setError("Password is required.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    login(username.trim(), rememberMe);

    const destination =
      location.state?.from?.pathname || "/dashboard";

    navigate(destination, { replace: true });
  };

  return (
    <div className="login-page">

      <div className="login-container">

        <div className="login-brand">
          <div className="login-logo">
            ✓
          </div>

          <h1>TaskFlow</h1>

          <p>
            Task Management System
          </p>
        </div>


        <div className="login-card">

          <div className="login-header">
            <h2>Welcome Back 👋</h2>

            <p>
              Login to continue to your dashboard
            </p>
          </div>


          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label>
                Username
              </label>

              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

            </div>


            <div className="form-group">

              <label>
                Password
              </label>

              <div className="password-wrapper">

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>

              </div>

            </div>


            {password && (
              <div className="password-strength">

                <div className="strength-header">

                  <span>
                    Password Strength
                  </span>

                  <strong
                    className={passwordStrength.className}
                  >
                    {passwordStrength.text}
                  </strong>

                </div>


                <div className="strength-bar">

                  <div
                    className={`strength-fill ${passwordStrength.className}`}
                  ></div>

                </div>

              </div>
            )}


            <div className="login-options">

              <label className="remember-me">

                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) =>
                    setRememberMe(e.target.checked)
                  }
                />

                <span>
                  Remember me
                </span>

              </label>

            </div>


            {error && (
              <div className="login-error">
                ⚠️ {error}
              </div>
            )}


            <button
              type="submit"
              className="login-button"
            >
              Login
            </button>

          </form>


          <div className="security-info">

            <div className="security-icon">
              🔐
            </div>

            <div>

              <strong>
                JWT Protected
              </strong>

              <p>
                Your login session is protected
                using a simulated JWT token.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;