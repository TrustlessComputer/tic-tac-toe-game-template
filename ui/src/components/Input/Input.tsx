import React, { HTMLInputTypeAttribute, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { PasswordIcon } from '@/components/Icons';
import Text from '@/components/Text';
import { opacify } from '@/theme/utils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .error {
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: ${({ theme }) => theme.red.A};
    margin-top: 4px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 52px;
  padding-left: 16px;
  padding-right: 16px;
  border-radius: 8px;
  color: ${({ theme }) => theme['txt-parallel']};
  border: 1px solid ${({ theme }) => opacify(50, theme['txt-parallel'])};

  :focus {
    border-color: ${({ theme }) => theme['txt-parallel']};
  }

  :hover {
    outline: none !important;
    border-color: ${({ theme }) => theme['txt-parallel']};
  }

  .input-container-style {
    flex: 1;
    font-weight: 400;
    font-size: 16px;
    line-height: 140%;
    color: ${({ theme }) => theme['txt-parallel']};
    height: 100%;

    :-webkit-autofill {
      -webkit-background-clip: text;
      -webkit-text-fill-color: ${({ theme }) => theme['txt-parallel']} !important;
    }
  }

  .icon-container {
    position: relative;
    width: 30px;
    height: 30px;
    margin-left: 20px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    :hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }
`;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
  refInput?: any;
  classContainer?: string | undefined;
  classInputWrapper?: string | undefined;
  classInput?: string | undefined;
  title?: string | undefined;
  errorMsg?: string;
}

const Input = (props: InputProps) => {
  const {
    type = 'text',
    value = '',
    placeholder = '',
    onChange = () => {},
    onKeyDown = () => {},
    refInput,
    classContainer,
    classInputWrapper,
    classInput,
    title,
    errorMsg,
    ...rest
  } = props;

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [currentType, setCurrentType] = useState<HTMLInputTypeAttribute | undefined>(type);
  const inputTypeInit = useRef<string>(type);

  useEffect(() => {
    inputTypeInit.current = type;
  }, []);

  const onClick = () => {
    setShowPassword(!showPassword);
    setCurrentType(currentType === 'text' ? 'password' : 'text');
  };

  return (
    <Container className={classContainer}>
      {!!title && (
        <Text
          style={{ textTransform: 'uppercase' }}
          size="12"
          fontWeight="semibold"
          color="txt-parallel"
          className="mb-8"
        >
          {title}
        </Text>
      )}
      <InputWrapper className={classInputWrapper}>
        <input
          {...rest}
          ref={refInput}
          className={`input-container-style ${classInput}`}
          type={currentType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          spellCheck="false"
        />
        {inputTypeInit.current === 'password' && (
          <div className="icon-container" onClick={onClick}>
            <PasswordIcon isShow={showPassword} />
          </div>
        )}
      </InputWrapper>
      {!!errorMsg && <Text className="error">{errorMsg}</Text>}
    </Container>
  );
};

export default Input;
