// Brings in the motion tool that adds animations to normal HTML elements
import { motion } from 'motion/react'
// Brings in the link tool for moving to another page
import { Link } from 'react-router-dom'
// Brings in a small arrow icon for the "View details" button
import { FiArrowRight } from 'react-icons/fi'
// Brings in the big animated GTL logo
import HeroLogo from '../components/HeroLogo'
// Brings in the list of laptops
import laptops from '../laptops'

// Animation settings for the grid of cards as a whole
const gridAnimation = {
  // Starting state: nothing special needed for the grid itself
  hidden: {},
  // Final state: reveal each card one after another
  show: {
    // Timing settings for the reveal
    transition: {
      // Wait 0.15 seconds between each card appearing
      staggerChildren: 0.15,
      // Wait 0.5 seconds before the first card appears (so the heading shows first)
      delayChildren: 0.5,
    },
  },
}

// Animation settings for each single card
const cardAnimation = {
  // Starting state: invisible and pushed 30px down
  hidden: { opacity: 0, y: 30 },
  // Final state: fully visible in its normal spot, taking 0.7 seconds
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
}

// The home page showing all laptop options as cards
function Home() {
  // Return the content to display
  return (
    // Wrapper for the whole home page
    <div>
      {/* Top area: logo centred, pulled up strongly (-mt-16) and the heading pulled closer below (-mb-10) */}
      <div className="-mb-10 -mt-16 flex justify-center">
        {/* The big liquid glass logo; bigger on larger screens */}
        <HeroLogo className="h-48 w-48 sm:h-56 sm:w-56 lg:h-64 lg:w-64" />
      </div>

      {/* Heading area: fades in and slides up; sits on a higher layer so the logo animation never covers it */}
      <motion.div
        // Start invisible and 20px lower
        initial={{ opacity: 0, y: 20 }}
        // Animate to fully visible in its normal spot
        animate={{ opacity: 1, y: 0 }}
        // Takes 1 second, after waiting 0.3 seconds
        transition={{ duration: 1, delay: 0.3 }}
        // Higher layer than the logo, centred text with a capped width
        className="relative z-10 mx-auto max-w-2xl text-center"
      >
        {/* Small pill badge above the heading */}
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-200 sm:text-sm">
          {/* Small glowing dot that pulses */}
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          {/* Badge text */}
          {laptops.length} options available
        </span>
        {/* Main heading; bigger on larger screens */}
        <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
          {/* First part of the heading in white */}
          Choose your{' '}
          {/* Second part with a light-green gradient fill */}
          <span className="bg-linear-to-r from-emerald-300 to-green-200 bg-clip-text text-transparent">
            {/* The highlighted words */}
            new laptop
          </span>
        </h1>
        {/* Short description under the heading */}
        <p className="mt-4 text-sm text-emerald-100/70 sm:text-base">
          {/* The description text */}
          Compare the options below, view the full details of each laptop, and apply for the one that suits you best.
        </p>
      </motion.div>

      {/* Grid of laptop cards: 1 column on phones, 2 on tablets, 4 on laptops */}
      <motion.div
        // Use the grid animation settings defined at the top
        variants={gridAnimation}
        // Begin in the "hidden" state
        initial="hidden"
        // Animate to the "show" state on page load
        animate="show"
        // Space above, grid layout with gaps
        className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {/* Go through every laptop and make a card for each one */}
        {laptops.map((laptop) => (
          // Animated wrapper for one card
          <motion.div
            // A unique key so React can keep track of each card
            key={laptop.id}
            // Use the single-card animation settings defined at the top
            variants={cardAnimation}
            // On hover: lift up 4px
            whileHover={{ y: -4 }}
            // When tapped: shrink slightly like a real button press
            whileTap={{ scale: 0.98 }}
          >
            {/* The whole card is a link to this laptop's details page */}
            <Link
              // The details page address, e.g. /laptop/option1
              to={`/laptop/${laptop.id}`}
              // Glass card look, full height, brighter border on hover
              className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-4 shadow-lg backdrop-blur-md transition-colors duration-300 hover:border-emerald-300 hover:bg-white/10"
            >
              {/* White photo area (product photos have white backgrounds) */}
              <div className="relative overflow-hidden rounded-2xl bg-white">
                {/* The laptop's main photo; grows slightly on hover */}
                <img
                  // The first photo from the laptop's folder (main)
                  src={laptop.images[0]}
                  // Text read out by screen readers or shown if the image fails
                  alt={laptop.name}
                  // Fixed shape, whole photo visible, padding, smooth zoom on hover
                  className="aspect-[4/3] w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                />
                {/* "AI PC" tag in the corner, only if the laptop has a tag */}
                {laptop.tag && (
                  // Small dark green pill in the top-left corner of the photo
                  <span className="absolute left-3 top-3 rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white shadow-md">
                    {/* The tag text */}
                    {laptop.tag}
                  </span>
                )}
              </div>

              {/* Text area under the photo; grows so all cards line up */}
              <div className="mt-4 flex flex-1 flex-col">
                {/* Option label in small green capitals */}
                <span className="text-xs font-semibold uppercase tracking-widest text-emerald-300">
                  {/* e.g. "Option 1" */}
                  {laptop.option}
                </span>
                {/* Laptop name */}
                <h2 className="mt-1 text-lg font-bold leading-snug text-white">
                  {/* The name */}
                  {laptop.name}
                </h2>
                {/* Short summary line */}
                <p className="mt-1 text-sm text-emerald-100/60">
                  {/* e.g. "Core i5 · 16 GB · 512 GB · 14"" */}
                  {laptop.summary}
                </p>

                {/* Monthly deduction box, pushed to the bottom of the card */}
                <div className="mt-auto pt-4">
                  {/* Soft green box */}
                  <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-2">
                    {/* Amount per month, in large bold text */}
                    <p className="text-xl font-extrabold text-white">
                      {/* "Rs." plus the amount with commas (e.g. 1,950) */}
                      Rs. {laptop.monthly.toLocaleString('en-LK')}
                      {/* "/ month" in smaller text */}
                      <span className="text-sm font-medium text-emerald-100/70"> / month</span>
                    </p>
                    {/* Number of months */}
                    <p className="text-xs text-emerald-100/60">
                      {/* e.g. "for 36 months" */}
                      for {laptop.months} months
                    </p>
                  </div>
                </div>

                {/* "View details" button look; turns white on hover */}
                <span className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-300 group-hover:bg-white group-hover:text-emerald-900">
                  {/* Button text */}
                  View details
                  {/* Arrow that nudges right on hover */}
                  <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

// Makes the home page available to App.jsx
export default Home