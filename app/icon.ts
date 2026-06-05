export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default async function Icon() {
  try {
    const res = await fetch('https://assets.creatoryogames.com/xobattle-assets/XO_Battle_Logo.png');
    const arrayBuffer = await res.arrayBuffer();
    
    return new Response(arrayBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    return new Response('Error loading favicon', { status: 500 });
  }
}
