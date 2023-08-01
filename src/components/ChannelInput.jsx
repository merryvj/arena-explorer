import React, {useState} from 'react'
import { styled } from 'styled-components'

function ChannelInput() {
    const [channelURL, setChannelURL] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        
        if (containsHost(channelURL)) {
            //do something
        }
        
        function containsHost(url) {
            const regex = /are\.na/i;
            return regex.test(url);
        }
    }

  return (
    <Wrapper onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor='url'>Channel URL</label>
        <input
            id='url'
            type='url'
            value={channelURL}
            placeholder="url"
            onChange={(e) => setChannelURL(e.target.value)}
        >
        </input>
        <input type='submit' value="Add channel"></input>
    </Wrapper>
  )
}


const Wrapper = styled.form`
    position: absolute;
    top: 0;
    width: 100%;
    height: 32px;
    border: solid 1px black;
    background: red;
    z-index: 10;
`
export default ChannelInput