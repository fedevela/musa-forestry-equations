import { signInWithGoogle } from "../firebase";

export const RenderButtonSignInWithGoogle = (): React.ReactNode => {
  return (
    <>
      <div className="card flex justify-content-center">
        <button className="button" onClick={signInWithGoogle}>
          <i className="pi pi-google"></i> Sign in with google
        </button>
      </div>
    </>
  );
};
