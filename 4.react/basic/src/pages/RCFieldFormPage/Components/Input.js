export default function Input({value = "", ...props}) {
  return (
    <div>
      <input style={{outline: "none"}} value={value} {...props} />
    </div>
  );
}
