// Brings in the liquid glass logo animation we added with shadcn
import { LiquidGlassLogo } from './liquid-glass-logo'
// Brings in the GTL logo (bundled) from laptops.js
import { logo } from '../laptops'

// Checks once whether this browser supports WebGL 2 (needed for the liquid glass effect)
const supportsWebGL2 = (() => {
  // Try the check safely so an error never breaks the page
  try {
    // Make a temporary drawing area and ask it for WebGL 2; true if it works
    return !!document.createElement('canvas').getContext('webgl2')
  } catch {
    // If anything goes wrong, treat it as not supported
    return false
  }
})()

// The big animated GTL logo; "className" lets each page set the size
function HeroLogo({ className = '' }) {
  // Return the content to display
  return (
    // Wrapper so the glow can sit behind the logo
    <div className="relative">
      {/* Soft round green glow behind the logo (smaller than the box so no edges show) */}
      <div className="absolute inset-10 rounded-full bg-emerald-400/40 blur-2xl" />
      {/* Box that sets the logo's size; centres the backup image */}
      <div className={`relative flex items-center justify-center ${className}`}>
        {/* If the browser supports WebGL 2, show the liquid glass logo; otherwise show the plain image */}
        {supportsWebGL2 ? (
          // The liquid glass logo animation
          <LiquidGlassLogo
            // The bundled logo file
            logo={logo}
            // The animation finishes on the logo alone (not a text wordmark)
            ending="logo"
            // Dark style to suit the dark green page
            theme="dark"
            // Logo shown at full size inside the tile
            logoScale={1}
            // Keep the logo's own colours
            logoColor="original"
            // Colour of the glass tile (same as the socials page)
            tileColor="#6e9db3"
            // See-through background so the page's green shows behind the logo
            background="transparent"
            // How quickly the ripple effect fades out
            decay={1.5}
            // Plays at half speed for a smooth, calm effect
            speed={0.5}
            // Fills the full height of its box
            height="100%"
            // Name read out by screen readers
            aria-label="GTL logo"
          />
        ) : (
          // Backup: the plain logo image, shown when the liquid glass effect can't run
          <img
            // The same bundled logo file
            src={logo}
            // Text read out by screen readers or shown if the image fails to load
            alt="GTL logo"
            // About two-thirds of the box, white circle behind it, soft shadow
            className="h-2/3 w-2/3 rounded-full bg-white object-contain p-2 shadow-2xl"
          />
        )}
      </div>
    </div>
  )
}

// Makes the logo component available to the pages
export default HeroLogo