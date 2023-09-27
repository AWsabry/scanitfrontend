import {
  InputTag,
  TextAreaTag,
  Label,
  InputTagWrapper,
} from "@components/ui/input/input.style";

const Input = ({ className, ...props }) => {
  return (
    <>
      {props.label && <Label htmlFor={props.id}>{props.label}</Label>}
      <InputTagWrapper phone={props.name == "phone"}>
        {props.name == "phone" && <span>+20</span>}
        <InputTag type={props.type ? props.type : "text"} {...props} />
      </InputTagWrapper>
    </>
  );
};

const TextArea = ({ className, ...props }) => {
  return (
    <>
      {props.label && <Label htmlFor={props.id}>{props.label}</Label>}
      <TextAreaTag {...props} />
    </>
  );
};

export { TextArea };

export default Input;
