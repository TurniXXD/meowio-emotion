import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../../auth';
import TextField from '../TextField';
import Button, { ButtonType } from '../Button';
import Card from '../Card';
import { useTranslation } from 'react-i18next';
import Popup, { PopupType } from '../Popup';
import { useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const card = css`
  max-width: 368px;
`;

const Form = styled.form`
  h1 {
    margin: 0;
    font-size: 30px;
    font-weight: 500;
    line-height: 36px;
    margin-bottom: 1rem;
  }

  div {
    margin-bottom: 1rem;
  }

  div label {
    font-size: 14px;
    margin-bottom: 0.5rem;
  }

  div:last-child {
    display: flex;
    justify-content: flex-end;
    padding-top: 1rem;
  }
`;

const LoginForm = () => {
  const { login } = useAuth();
  const { t } = useTranslation('common');
  const [triggerPopup, setTriggerPopup] = useState<{
    type: PopupType;
    text: string;
  } | null>(null);

  const { handleSubmit, control } = useForm();

  const onSubmit = (data: any) => {
    try {
      login({
        username: data.email,
        password: data.password,
      });
    } catch (e) {
      setTriggerPopup({
        type: PopupType.Error,
        text: e as string,
      });
    }
  };

  return (
    <>
      <Card css={card}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h1>{t('login')}</h1>
          <div>
            <label>{t('email')}</label>
            <Controller
              name="email"
              control={control}
              defaultValue={''}
              rules={{
                required: t('validations.emailRequired'),
              }}
              render={({ field }) => (
                <TextField
                  fieldProps={field}
                  placeholder={t('emailPlaceholder')}
                  email
                  dataTestId="email"
                />
              )}
            />
          </div>

          <div>
            <label>{t('password')}</label>
            <Controller
              name="password"
              control={control}
              defaultValue={''}
              rules={{ required: t('validations.passwordRequired') }}
              render={({ field }) => (
                <TextField
                  fieldProps={field}
                  placeholder={t('passwordPlaceholder')}
                  password
                  dataTestId="password"
                />
              )}
            />
          </div>

          <Button
            type={ButtonType.Primary}
            children={t('login')}
            submit
            dataTestId="submit"
          />
        </Form>
      </Card>
      {triggerPopup && (
        <Popup type={triggerPopup.type} text={triggerPopup.text} />
      )}
    </>
  );
};

export default LoginForm;
