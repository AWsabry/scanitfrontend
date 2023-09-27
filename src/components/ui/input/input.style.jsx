import styled, { css, themeGet } from "@styled";

export const Label = styled.label`
  display: block;
  line-height: 1;
  margin-bottom: 10px;
  color: ${themeGet("colors.heading")};
  font-family: ${themeGet("fonts.body")};
  font-size: ${themeGet("fontSizes.standard")};
  font-weight: ${themeGet("fontWeights.subHeading")};
`;

const inputStyle = css`
  width: 100%;
  display: block;
  line-height: 1;
  padding: 12px 15px;
  transition: ${themeGet("transition")};
  border-radius: ${themeGet("radii.sm")};
  font-family: ${themeGet("fonts.body")};
  font-size: ${themeGet("fontSizes.standard")};
  border: 1px solid ${themeGet("colors.borderLight")};
  /* border: ${(props) =>
    props.phone ? "none" : "1px solid " + themeGet("colors.borderLight")}; */

  &:focus {
    border-color: ${themeGet("colors.primary")};
  }
`;

const phoneStyle = css`
  position: absolute;
  content: "+20";
  left: 0;
  padding: 0.25rem;
  background-color: lightgray;
`;

export const InputTagWrapper = styled.div`
  width: 100%;
  display: inline-flex;
  border-radius: ${themeGet("radii.sm")};
  /* border: 1px solid ${themeGet("colors.borderLight")}; */
  /* border: ${(props) =>
    props.phone ? "1px solid " + themeGet("colors.borderLight") : "none"}; */
  span {
    padding: 0.75rem 0.9375rem;
  }
`;

export const InputTag = styled.input`
  ${inputStyle};
`;

export const TextAreaTag = styled.textarea`
  ${inputStyle}
`;
