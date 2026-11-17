// Brings in every image inside src/assets/images (any subfolder) so Vite bundles them; gives back their real addresses
const allImages = import.meta.glob('./assets/images/**/*.{avif,jpg,jpeg,png,webp}', {
  // Load them straight away (not later on demand)
  eager: true,
  // We only need each image's address
  import: 'default',
})

// Helper: finds one image by its folder and name, whatever its ending is (.avif, .jpg, .png...)
function findImage(name) {
  // Look through all images for one whose path ends with that name plus any file ending
  const match = Object.entries(allImages).find(([path]) =>
    // Remove the file ending from the path and compare (e.g. "./assets/images/gifts/backpack")
    path.replace(/\.[^.]+$/, '') === `./assets/images/${name}`,
  )
  // Give back the image address, or nothing if it wasn't found
  return match ? match[1] : undefined
}

// Helper: returns all photos from one folder, with main first and the rest in number order
function photosFrom(folder) {
  // Turn the list of all images into [path, address] pairs
  return Object.entries(allImages)
    // Keep only the images inside the folder we asked for
    .filter(([path]) => path.includes(`/images/${folder}/`))
    // Sort them: main first, then 2, 3, 4...
    .sort(([a], [b]) => {
      // Get just the file name without the folder or ending (e.g. "main" or "2")
      const nameA = a.split('/').pop().split('.')[0]
      // Same for the second file
      const nameB = b.split('/').pop().split('.')[0]
      // "main" always goes first
      if (nameA === 'main') return -1
      // "main" always goes first (other direction)
      if (nameB === 'main') return 1
      // Otherwise sort by number (2 before 3, 3 before 10)
      return Number(nameA) - Number(nameB)
    })
    // Keep only the addresses
    .map(([, url]) => url)
}

// The GTL logo shown at the top of the page (any file ending)
export const logo = findImage('logo')

// The free gifts, defined once so each laptop can list which ones it includes
const gifts = {
  // The laptop backpack
  backpack: {
    // Name shown under the gift photo
    name: 'Lenovo Laptop Backpack',
    // The gift's photo (any file ending)
    image: findImage('gifts/backpack'),
  },
  // The wireless earbuds
  earbuds: {
    // Name shown under the gift photo
    name: 'Lenovo E310 Wireless Earbuds',
    // The gift's photo (any file ending)
    image: findImage('gifts/earbuds'),
  },
  // The wireless mouse
  mouse: {
    // Name shown under the gift photo
    name: 'Lenovo 700 Wireless Mouse',
    // The gift's photo (any file ending)
    image: findImage('gifts/mouse'),
  },
}

// The list of the four laptop options, in the order they appear on the page
const laptops = [
  {
    // Short id used in the page address (e.g. /laptop/option1) and matches the photo folder name
    id: 'option1',
    // Label shown above the name
    option: 'Option 1',
    // Full laptop name
    name: 'Lenovo IdeaPad Slim 3 14IRH10',
    // One short line shown on the card
    summary: 'Core i5 · 16 GB · 512 GB · 14"',
    // Small tag on the card (null = no tag)
    tag: null,
    // Short description shown on the details page
    description:
      'A compact, lightweight laptop for everyday work, study and multitasking. The Core i5 processor and 16 GB of memory keep things fast, and the backlit keyboard and Full HD webcam make typing and video calls comfortable.',
    // All photos from src/assets/images/option1 (main first)
    images: photosFrom('option1'),
    // The amount deducted from salary each month
    monthly: 1950,
    // How many months the deduction runs
    months: 36,
    // The gifts included with this laptop
    gifts: [gifts.backpack, gifts.earbuds, gifts.mouse],
    // The key specs, in the same order for every laptop
    specs: [
      // Processor
      { label: 'Processor', value: 'Intel Core i5-13420H, 8 cores, up to 4.6 GHz' },
      // Memory
      { label: 'Memory', value: '16 GB DDR5' },
      // Storage
      { label: 'Storage', value: '512 GB SSD' },
      // Display
      { label: 'Display', value: '14" WUXGA (1920 × 1200), IPS, anti-glare' },
      // Graphics
      { label: 'Graphics', value: 'Intel UHD Graphics' },
      // Battery
      { label: 'Battery', value: '50 Wh' },
      // Weight
      { label: 'Weight', value: '1.39 kg' },
      // Keyboard
      { label: 'Keyboard', value: 'Backlit' },
      // Camera and security
      { label: 'Camera & security', value: 'Full HD camera with privacy shutter, face login (Windows Hello)' },
      // Ports
      { label: 'Ports', value: '2 × USB-A, 1 × USB-C, HDMI, SD card reader, audio jack' },
      // Warranty
      { label: 'Warranty', value: '3 years (1 year for battery and adapter)' },
    ],
    // This laptop's pre-filled Google Form link (added later)
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSd0A7MQ2ZyBB4mrP9GNiP724prDbpOWDMxSee355yzdZ9KMXw/viewform?usp=pp_url&entry.1491534940=Option+1+%E2%80%93+Lenovo+IdeaPad+Slim+3+14IRH10+(Core+i5)',
  },
  {
    // Short id used in the page address and matches the photo folder name
    id: 'option2',
    // Label shown above the name
    option: 'Option 2',
    // Full laptop name
    name: 'Lenovo IdeaPad Slim 3 14IRH10',
    // One short line shown on the card
    summary: 'Core i7 · 16 GB · 512 GB · 14"',
    // Small tag on the card (null = no tag)
    tag: null,
    // Short description shown on the details page
    description:
      'The same slim, lightweight design with a more powerful Core i7 processor, for heavier work like large spreadsheets, many open programs and light editing.',
    // All photos from src/assets/images/option2 (main first)
    images: photosFrom('option2'),
    // The amount deducted from salary each month
    monthly: 2975,
    // How many months the deduction runs
    months: 36,
    // The gifts included with this laptop
    gifts: [gifts.backpack],
    // The key specs, in the same order for every laptop
    specs: [
      // Processor
      { label: 'Processor', value: 'Intel Core i7-13620H, 10 cores, up to 4.9 GHz' },
      // Memory
      { label: 'Memory', value: '16 GB DDR5' },
      // Storage
      { label: 'Storage', value: '512 GB SSD' },
      // Display
      { label: 'Display', value: '14" WUXGA (1920 × 1200), IPS, anti-glare' },
      // Graphics
      { label: 'Graphics', value: 'Intel UHD Graphics' },
      // Battery
      { label: 'Battery', value: '50 Wh' },
      // Weight
      { label: 'Weight', value: '1.39 kg' },
      // Keyboard
      { label: 'Keyboard', value: 'Not backlit' },
      // Camera and security
      { label: 'Camera & security', value: 'Full HD camera with privacy shutter, face login (Windows Hello)' },
      // Ports
      { label: 'Ports', value: '2 × USB-A, 1 × USB-C, HDMI, SD card reader, audio jack' },
      // Warranty
      { label: 'Warranty', value: '2 years' },
    ],
    // This laptop's pre-filled Google Form link (added later)
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSd0A7MQ2ZyBB4mrP9GNiP724prDbpOWDMxSee355yzdZ9KMXw/viewform?usp=pp_url&entry.1491534940=Option+2+%E2%80%93+Lenovo+IdeaPad+Slim+3+14IRH10+(Core+i7)',
  },
  {
    // Short id used in the page address and matches the photo folder name
    id: 'option3',
    // Label shown above the name
    option: 'Option 3',
    // Full laptop name
    name: 'Lenovo IdeaPad Slim 3 15IWC11',
    // One short line shown on the card
    summary: 'Core 5 320 · 16 GB · 512 GB · 15.3"',
    // Small tag on the card
    tag: 'AI PC',
    // Short description shown on the details page
    description:
      'A newer AI-ready laptop with a larger, brighter 15.3-inch screen, great for working with documents side by side. Memory can be upgraded to 32 GB later.',
    // All photos from src/assets/images/option3 (main first)
    images: photosFrom('option3'),
    // The amount deducted from salary each month
    monthly: 3915,
    // How many months the deduction runs
    months: 36,
    // The gifts included with this laptop
    gifts: [gifts.backpack, gifts.earbuds, gifts.mouse],
    // The key specs, in the same order for every laptop
    specs: [
      // Processor
      { label: 'Processor', value: 'Intel Core 5 320, 6 cores, up to 4.6 GHz, AI PC (NPU up to 16 TOPS)' },
      // Memory
      { label: 'Memory', value: '16 GB DDR5 (upgradable to 32 GB)' },
      // Storage
      { label: 'Storage', value: '512 GB SSD' },
      // Display
      { label: 'Display', value: '15.3" WUXGA (1920 × 1200), IPS, 400 nits, anti-glare' },
      // Graphics
      { label: 'Graphics', value: 'Intel Graphics' },
      // Battery
      { label: 'Battery', value: '50 Wh' },
      // Weight
      { label: 'Weight', value: '1.59 kg' },
      // Keyboard
      { label: 'Keyboard', value: 'Backlit' },
      // Camera and security
      { label: 'Camera & security', value: 'Full HD camera with privacy shutter, face login (Windows Hello)' },
      // Ports
      { label: 'Ports', value: '2 × USB-A, 1 × USB-C, HDMI, SD card reader, audio jack' },
      // Warranty
      { label: 'Warranty', value: '3 years' },
    ],
    // This laptop's pre-filled Google Form link (added later)
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSd0A7MQ2ZyBB4mrP9GNiP724prDbpOWDMxSee355yzdZ9KMXw/viewform?usp=pp_url&entry.1491534940=Option+3+%E2%80%93+Lenovo+IdeaPad+Slim+3+15IWC11+(Core+5+320)',
  },
  {
    // Short id used in the page address and matches the photo folder name
    id: 'option4',
    // Label shown above the name
    option: 'Option 4',
    // Full laptop name
    name: 'Lenovo IdeaPad Slim 5 14IMH10',
    // One short line shown on the card
    summary: 'Core Ultra 5 · 16 GB · 512 GB · 14"',
    // Small tag on the card
    tag: 'AI PC',
    // Short description shown on the details page
    description:
      'A premium all-aluminium laptop with an AI-ready Core Ultra 5 processor, stronger Intel Arc graphics and the biggest battery of the four, plus fast USB-C ports and 4K HDMI output.',
    // All photos from src/assets/images/option4 (main first)
    images: photosFrom('option4'),
    // The amount deducted from salary each month
    monthly: 3235,
    // How many months the deduction runs
    months: 36,
    // The gifts included with this laptop
    gifts: [gifts.backpack],
    // The key specs, in the same order for every laptop
    specs: [
      // Processor
      { label: 'Processor', value: 'Intel Core Ultra 5 135H, 14 cores, up to 4.6 GHz, AI PC (NPU up to 11 TOPS)' },
      // Memory
      { label: 'Memory', value: '16 GB DDR5, dual-channel (upgradable to 32 GB)' },
      // Storage
      { label: 'Storage', value: '512 GB SSD (second SSD slot available)' },
      // Display
      { label: 'Display', value: '14" WUXGA (1920 × 1200), IPS, anti-glare' },
      // Graphics
      { label: 'Graphics', value: 'Intel Arc Graphics' },
      // Battery
      { label: 'Battery', value: '60 Wh' },
      // Weight
      { label: 'Weight', value: '1.47 kg' },
      // Keyboard
      { label: 'Keyboard', value: 'Backlit' },
      // Camera and security
      { label: 'Camera & security', value: 'Full HD camera with privacy shutter, face login (Windows Hello)' },
      // Ports
      { label: 'Ports', value: '2 × USB-C, 2 × USB-A, HDMI 2.1 (4K), microSD reader, audio jack' },
      // Warranty
      { label: 'Warranty', value: '2 years' },
    ],
    // This laptop's pre-filled Google Form link (added later)
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSd0A7MQ2ZyBB4mrP9GNiP724prDbpOWDMxSee355yzdZ9KMXw/viewform?usp=pp_url&entry.1491534940=Option+4+%E2%80%93+Lenovo+IdeaPad+Slim+5+14IMH10+(Core+Ultra+5)',
  },
]

// Makes the laptop list available to the pages
export default laptops