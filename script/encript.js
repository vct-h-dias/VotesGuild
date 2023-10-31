const hash256 = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
  
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  
    return hashHex;
}

const randomRegex = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // Caracteres permitidos
    let regex = '';
      
    for (let i = 0; i < 16; i++) {
        const index = Math.floor(Math.random() * chars.length);
        regex += chars.charAt(index);
    }
      
    return regex;
}
