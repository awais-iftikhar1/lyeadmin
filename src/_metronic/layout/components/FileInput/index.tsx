import React from "react";
import styled from "styled-components";

interface IFileInputProps {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  url?: string;
}

const FileInput = (props: IFileInputProps) => {
  const { name, onChange, url } = props;
  const [file, setFile] = React.useState<undefined | File>(undefined);
  
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // if (file) {
    //   onChange(e);
    //   const reader = new FileReader();
    //   reader.readAsDataURL(file);
    //   reader.onloadend = () => {
  //     setFile(reader.result as string);
    //   };
    // } else {
    //   setFile(undefined);
    // }
    if (file) {
      onChange(e);
      setFile(file);
    }
  };

  return (
    <InputContainer>
      <Input
        type={"file"}
        onChange={onFileChange}
        accept={"image/*"}
        name={name}
      />
      <StyledFileInput>
        {file ? (
          <div color={"primary"} style={{ textAlign: "center",width:"160px",height:"160px" }}>
            <img alt="" style={{width:"100%",height:"100%"}} src={URL.createObjectURL(file)}/>
          </div>
        ) : !url ? (
          <div
            style={{
              width: 40,
              height: 40,
              background: "silver",
              alignItems: "center",
              display:"flex",
              justifyContent: "center",
            }}
          >
            
            <div style={{
               width: 40,
               height: 40,
               display:"flex",
               background: "#dadce4",
               alignItems: "center",
               justifyContent: "center",
            }}>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="#969cba"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </div>
          </div>
        ) : (
          <img style={{ width: "100%", height: "100%" }} src={url} />
        )}
      </StyledFileInput>
    </InputContainer>
  );
};

const Input = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
`

const InputContainer = styled.div`
position: relative;
`

export const StyledFileInput = styled.div`
  display: flex;
  flexDirection: column;
  align-items: center;
  justify-content: center;
  border: 1px dashed #dadce4;
  padding: 4%;
  margin-right: 1rem;
  width: 160px;
  height: 160px;
`

export default FileInput;
