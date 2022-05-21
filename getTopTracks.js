
const fetchApi = async() => {
    const clientId = '18602e9d04a0426da087afbddbbbb265'
    const clientSecret = 'a7b2f4b4d0dc4d1ba64e1139434bbcb2'

    const result = await fetch('https://accounts.spotify.com/api/token',{
        method:'POST',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body : 'grant_type=client_credentials'
    });
    const data = await result.json();
    console.log(data)
    return data.access_token
}

const getArtistId = async (name) => {
    const token = await fetchApi();
    console.log(token)
    const result = await fetch(`https://api.spotify.com/v1/search?q=${name}tk&type=artist`,{
        method:'GET',
        headers:{'Authorization': 'Bearer ' + token}
        })
    const {artists} = await result.json();
    console.log(artists)
    return artists.items[0].id;
}
        

export const getArtistTopTracks = async(name) => {
    const token = await fetchApi();
    console.log(token)
    const artistId = await getArtistId(name);
    const result = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,{
        method:'GET',
        headers:{'Authorization': 'Bearer ' + token}
        })
    const {tracks} = await result.json();
    
    const topTracks = tracks.map(track => {
       return {
            name:track.name,
            popularity: track.popularity
        }
    })
    return topTracks;
}

export const getArtistInfo = async (name) => {
    const token = await fetchApi();
    const artistId = await getArtistId(name);
    const result = await fetch(`https://api.spotify.com/v1/artists/${artistId}`,{
        method:'GET',
        headers:{'Authorization': 'Bearer ' + token}
        })
    const response = await result.json();
    const info = {
        name:response.name,
        image: response?.images[0],
        genres: response.genres,
        followers: response.followers.total,
        externalUrl:response.external_urls.spotify
    }
    console.log(response)
    console.log(info)
    return info;
    
}