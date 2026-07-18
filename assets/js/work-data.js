/*
==========================================================================
FEATURED WORK EDITING GUIDE
==========================================================================

TO ADD A NEW PROJECT:
1. Copy an existing project block (everything between { and } including commas).
2. Paste it at the TOP of the array (below the const featuredWork = [ line).
3. Change the values inside the double quotes only.
4. Do not change the field names (title, caption, category, year, image, link).

IMAGE:
Upload your project image to Cloudinary (or any image hosting service like Imgur/ImgBB) 
and paste the Direct Image URL here.
Example:
https://res.cloudinary.com/your-account/image/upload/project-image.jpg

LATEST PROJECTS SHOULD ALWAYS BE PLACED AT THE TOP of the list.
==========================================================================
*/

const featuredWork = [
  {
    title: "Major Engineering Construction",
    caption: "MEC's Bussines Website",
    category: "Bussiness",
    year: "2026",
    image: "https://i.ibb.co/TBWzRWzS/mec.png",
    link: "https://www.mecchennai.com/"
  },
  {
    title: "Abinanth A",
    caption: "Abinanth's Portfolio Website",
    category: "Personal Portfolio",
    year: "2026",
    image: "https://i.ibb.co/218bctFv/abinanth.png",
    link: "https://abinanth.indevs.in/"
  },
];
