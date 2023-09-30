import styled, { css, devices, space, themeGet } from "@styled";

export const SectionText = styled.p`
  max-width: 465px;

  ${devices.sm} {
    max-width: 100%;
  }
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: ${themeGet("fontWeights.medium")};
`;

export const SectionTitleWrap = styled.div`
  ${space};
  text-align: ${(props) => (props.align ? props.align : "center")};

  ${SectionText} {
    ${(props) =>
      props.align === "center" &&
      css`
        margin: auto;
      `}

    ${(props) =>
      props.align === "right" &&
      css`
        margin-left: auto;
      `}
  }
}
`;
