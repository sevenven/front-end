const Input = props => {
  return <input {...props} />;
};

export default function CustomizeInput({value = "", ...props}) {
  return (
    <div>
      <Input style={{outline: "none"}} value={value} {...props} />
    </div>
  );
}
