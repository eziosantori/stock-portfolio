import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router";
import Reset from "../../components/Auth/Reset";

function ResetPage() {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) return;
        if (user) navigate("/dashboard");
      }, [user, loading]);
    return (
        <div>
            <Reset />
        </div>
    )
}

export default ResetPage
