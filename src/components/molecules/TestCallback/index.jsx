// ListTransaction.jsx
const TestCallback = ({ onTest }) => {
  return (
    <div>
      <button
        onClick={() => {
          if (typeof onTest === "function") {
            onTest("halo dari child");
          }
        }}
      >
        Klik Test Callback
      </button>
    </div>
  );
};

export default TestCallback;