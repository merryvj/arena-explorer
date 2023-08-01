import React, { useEffect, useState } from 'react'

function useChannel(url) {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState('unloaded');

    useEffect(() => {
        setStatus('loading');

        async function getChannelBlocks() {
            try {
                setData([]);
                const res = await fetch(
                `http://api.are.na/v2/channels/${getUrlSlug(url)}`
                )
                const json = await res.json();
                setData(json);
                setStatus('loaded');
            } catch (e) {
                setStatus('error')
            }
        }

        getChannelBlocks();

    }, [url])
    

  return {blocks: data, status}
}

function getUrlSlug(url) {
    let cleanedURL = url.replace(/^(https?:\/\/)?(www\.)?/, '');
    let parts = cleanedURL.split('/');
    let slug = parts[parts.length - 1];


    return slug;
}

export default useChannel
