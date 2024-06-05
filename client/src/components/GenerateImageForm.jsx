import React from 'react'
import styled from 'styled-components'
import Button from './button'
import TextInput from './TextInput'
import { AutoAwesome, CreateRounded } from '@mui/icons-material'

const Form = styled.div`
    flex: 1;
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 9%;
    justify-content: center;
`

const Top = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`

const Title = styled.div`
    font-size: 28px;
    font-weight: 500;
    color: ${({ theme }) => theme.text_primary};
`

const Desc = styled.div`
    font-size: 17px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary};
`

const Body = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
    font-size: 12px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary};
`

const Actions = styled.div`
    display: flex;
    flex: 1;
    gap: 8px;
`

const GenerateImageForm = ({
    post,
    setPost,
    createPostLoading,
    setGenerateImageLoading,
    generateImageLoading,
    setCreatePostLoading,
}) => {

    const generateImageFun = () => {
        setGenerateImageLoading(true);
    }
    const createPostFun = () => {
        setCreatePostLoading(true);
    }

    return (
        <Form>
            <Top>
                <Title>
                    Generate Image with prompt
                </Title>
                <Desc>
                    Describe the image.
                </Desc>
            </Top>
            <Body>
                <TextInput
                    label='Author'
                    placeholder='John Doe'
                    name='name'
                    value={post.name}
                    handleChange={(e) => setPost({ ...post, name: e.target.value })}
                />
                <TextInput
                    label='Prompt'
                    placeholder='Write a detailed description of the image you&apos;d like to see 😄'
                    name='prompt'
                    rows='8'
                    textArea
                    value={post.prompt}
                    handleChange={(e) => setPost({ ...post, prompt: e.target.value })}
                />
                Show your work to the community!
            </Body>
            <Actions>
                <Button
                    text='Generate Image'
                    flex leftIcon={<AutoAwesome />}
                    isLoading={generateImageLoading}
                    isDisabled={post.prompt === ""}
                    onClick={() => generateImageFun()}
                />

                <Button
                    text='Post Image'
                    flex type='secondary'
                    leftIcon={<CreateRounded />}
                    isLoading={createPostLoading}
                    isDisabled={post.name === "" || post.prompt === "" || post.photo === ""}
                    onClick={() => createPostFun()}
                />
            </Actions>
        </Form>
    )
}

export default GenerateImageForm