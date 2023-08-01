import React, {useState} from 'react'
import { styled } from 'styled-components'

function ChannelInput({updateBlocks}) {
    const [channelURL, setChannelURL] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        
        if (containsHost(channelURL)) {
            updateBlocks(channelURL);
        }

        function containsHost(url) {
            const regex = /are\.na/i;
            return regex.test(url);
        }
    }

  return (
    <Wrapper onSubmit={(e) => handleSubmit(e)}>
        <Form>
            {/* <label htmlFor='url'>Channel URL</label> */}
            <URLInput
                id='url'
                type='url'
                value={channelURL}
                placeholder="https://www.are.na/are-na-team/arena-influences"
                onChange={(e) => setChannelURL(e.target.value)}
            >
            </URLInput>
            <SubmitBtn type='submit' value="Set channel"></SubmitBtn>
        </Form>
    </Wrapper>
  )
}


const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 32px;
    z-index: 9999;
    color: black;
`

const Form = styled.form`
    position: relative;
    float: right;
    height: 100%;
    border: solid 1px blue;
`

const URLInput = styled.input`
    outline: none;
    border-radius: 0;
    border: 0;
    border-right: solid 1px black;
    height: 100%;
    min-width: 300px;
    padding: 0 8px;
    background: #cecece;
    color: black;
`

const SubmitBtn = styled.input`
    height: 100%;
    padding: 0 8px;
    color: black;
    border-radius: 0;
    outline: 0;
    border: 0;
`
export default ChannelInput