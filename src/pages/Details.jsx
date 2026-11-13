// Brings in React's tool for remembering a value (which photo is selected)
import { useState } from 'react'
// Brings in the motion tool for animations, and AnimatePresence for fading photos in and out
import { motion, AnimatePresence } from 'motion/react'
// Brings in tools to read the laptop id from the address and to link back home
import { useParams, Link } from 'react-router-dom'
// Brings in simple line icons for the arrows, gifts, apply button and most specs
import {
  FiArrowLeft, FiArrowUpRight, FiGift, FiCpu, FiHardDrive, FiMonitor,
  FiLayers, FiBattery, FiCamera, FiShield, FiCheckCircle, FiClock,
} from 'react-icons/fi'
// Brings in a few extra icons for specs that the line set doesn't have
import { FaMemory, FaKeyboard, FaWeightHanging, FaUsb } from 'react-icons/fa6'
// Brings in the list of laptops
import laptops from '../laptops'

// Matches each spec name to its icon (any spec not listed gets a tick icon)
const specIcons = {
  // Processor icon
  Processor: FiCpu,
  // Memory icon
  Memory: FaMemory,
  // Storage icon
  Storage: FiHardDrive,
  // Display icon
  Display: FiMonitor,
  // Graphics icon
  Graphics: FiLayers,
  // Battery icon
  Battery: FiBattery,
  // Weight icon
  Weight: FaWeightHanging,
  // Keyboard icon
  Keyboard: FaKeyboard,
  // Camera and security icon
  'Camera & security': FiCamera,
  // Ports icon
  Ports: FaUsb,
  // Warranty icon
  Warranty: FiShield,
}

// Animation for each section: fades in and slides up when it scrolls into view
const sectionAnimation = {
  // Start invisible and 30px lower
  initial: { opacity: 0, y: 30 },
  // Animate to fully visible when the section comes on screen
  whileInView: { opacity: 1, y: 0 },
  // Only animate the first time it comes on screen
  viewport: { once: true, amount: 0.2 },
  // Takes 0.8 seconds
  transition: { duration: 0.8 },
}

// The details page for one laptop
function Details() {
  // Read the laptop id from the address (e.g. "option1")
  const { id } = useParams()
  // Find the laptop with that id in the list
  const laptop = laptops.find((item) => item.id === id)
  // Remember which photo is showing in the large view (starts with the first one)
  const [activePhoto, setActivePhoto] = useState(0)

  // If no laptop matches the address, show a friendly message instead
  if (!laptop) {
    // Return the "not found" message
    return (
      // Centred text with space above
      <div className="py-20 text-center">
        {/* Heading */}
        <h1 className="text-3xl font-bold">Laptop not found</h1>
        {/* Link back to the home page */}
        <Link to="/" className="mt-6 inline-flex items-center gap-2 text-emerald-300 hover:text-white">
          {/* Left arrow */}
          <FiArrowLeft />
          {/* Link text */}
          Back to all laptops
        </Link>
      </div>
    )
  }

  // Return the details page content
  return (
    // Wrapper for the whole details page
    <div>
      {/* Back link at the top */}
      <Link
        // Goes to the home page
        to="/"
        // Small green text that turns white on hover, with space below
        className="group mb-8 mt-4 inline-flex items-center gap-2 text-sm font-medium text-emerald-300 transition-colors hover:text-white"
      >
        {/* Left arrow that nudges left on hover */}
        <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />
        {/* Link text */}
        Back to all laptops
      </Link>

      {/* Top section: gallery and key info, stacked on phones, side by side on laptops */}
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* LEFT: photo gallery; fades in from the left */}
        <motion.div
          // Start invisible and 30px to the left
          initial={{ opacity: 0, x: -30 }}
          // Animate to fully visible in its normal spot
          animate={{ opacity: 1, x: 0 }}
          // Takes 0.8 seconds
          transition={{ duration: 0.8 }}
        >
          {/* Large photo area: white background, rounded, fixed shape */}
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl">
            {/* Lets the old photo fade out while the new one fades in */}
            <AnimatePresence mode="wait">
              {/* The large photo; changing "key" tells it to animate when the photo changes */}
              <motion.img
                // A new key for each photo so the fade runs on every change
                key={activePhoto}
                // The selected photo
                src={laptop.images[activePhoto]}
                // Text read out by screen readers
                alt={`${laptop.name}, photo ${activePhoto + 1}`}
                // Start invisible
                initial={{ opacity: 0 }}
                // Fade to visible
                animate={{ opacity: 1 }}
                // Fade out when replaced
                exit={{ opacity: 0 }}
                // Quick fade
                transition={{ duration: 0.3 }}
                // Fixed shape, whole photo visible, padding
                className="aspect-[4/3] w-full object-contain p-6 sm:p-10"
              />
            </AnimatePresence>
            {/* "AI PC" tag in the corner, only if the laptop has a tag */}
            {laptop.tag && (
              // Dark green pill in the top-left corner
              <span className="absolute left-4 top-4 rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white shadow-md">
                {/* The tag text */}
                {laptop.tag}
              </span>
            )}
          </div>

          {/* Row of thumbnails, only if there's more than one photo */}
          {laptop.images.length > 1 && (
            // Thumbnails in a row that wraps on small screens
            <div className="mt-4 flex flex-wrap gap-3">
              {/* Make a thumbnail button for each photo */}
              {laptop.images.map((photo, index) => (
                // A clickable thumbnail
                <button
                  // A unique key so React can keep track of each thumbnail
                  key={photo}
                  // Tells the browser this is a normal button (not a form submit)
                  type="button"
                  // When clicked, show this photo in the large view
                  onClick={() => setActivePhoto(index)}
                  // Text read out by screen readers
                  aria-label={`Show photo ${index + 1}`}
                  // White square; bright green ring if selected, faint ring and slightly faded if not
                  className={`h-16 w-16 overflow-hidden rounded-xl bg-white p-1.5 transition sm:h-20 sm:w-20 ${
                    // Check if this thumbnail is the selected one
                    index === activePhoto
                      // Selected: strong green ring
                      ? 'ring-4 ring-emerald-400'
                      // Not selected: faint ring, slightly faded, full brightness on hover
                      : 'opacity-60 ring-1 ring-white/20 hover:opacity-100'
                  }`}
                >
                  {/* The small photo inside the thumbnail */}
                  <img src={photo} alt="" className="h-full w-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* RIGHT: key information; fades in from the right */}
        <motion.div
          // Start invisible and 30px to the right
          initial={{ opacity: 0, x: 30 }}
          // Animate to fully visible in its normal spot
          animate={{ opacity: 1, x: 0 }}
          // Takes 0.8 seconds, after a short wait
          transition={{ duration: 0.8, delay: 0.2 }}
          // Stack the pieces in a column
          className="flex flex-col"
        >
          {/* Option label as a small pill */}
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-200">
            {/* Small glowing dot that pulses */}
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            {/* e.g. "Option 1" */}
            {laptop.option}
          </span>
          {/* Laptop name as the main heading */}
          <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">
            {/* The name */}
            {laptop.name}
          </h1>
          {/* Summary line in light green */}
          <p className="mt-2 text-base font-semibold text-emerald-300 sm:text-lg">
            {/* e.g. "Core i5 · 16 GB · 512 GB · 14"" */}
            {laptop.summary}
          </p>
          {/* Short description */}
          <p className="mt-4 text-sm leading-relaxed text-emerald-100/70 sm:text-base">
            {/* The description text */}
            {laptop.description}
          </p>

          {/* Monthly deduction box */}
          <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5">
            {/* Small label above the amount */}
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-300">
              {/* Label text */}
              Monthly salary deduction
            </p>
            {/* The amount in large bold text */}
            <p className="mt-2 text-4xl font-extrabold text-white">
              {/* "Rs." plus the amount with commas (e.g. 1,950) */}
              Rs. {laptop.monthly.toLocaleString('en-LK')}
              {/* "/ month" in smaller text */}
              <span className="text-base font-medium text-emerald-100/70"> / month</span>
            </p>
            {/* Number of months, with a clock icon */}
            <p className="mt-2 inline-flex items-center gap-2 text-sm text-emerald-100/70">
              {/* Clock icon */}
              <FiClock className="text-emerald-300" />
              {/* e.g. "36 months (3 years)" */}
              {laptop.months} months ({laptop.months / 12} years)
            </p>
          </div>

          {/* Apply button: a working link if the form link is set, otherwise a greyed-out "coming soon" */}
          {laptop.formUrl ? (
            // Working button that opens the Google Form in a new tab
            <motion.a
              // The laptop's Google Form link
              href={laptop.formUrl}
              // Open in a new tab so this page stays open
              target="_blank"
              // Safety setting that should always go with target="_blank"
              rel="noopener noreferrer"
              // On hover: lift up 2px
              whileHover={{ y: -2 }}
              // When tapped: shrink slightly like a real button press
              whileTap={{ scale: 0.97 }}
              // Large green button; turns white with green text on hover
              className="group mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-4 text-base font-bold text-white shadow-lg transition-colors duration-300 hover:bg-white hover:text-emerald-900"
            >
              {/* Button text */}
              Apply for this laptop
              {/* Arrow that nudges up-right on hover */}
              <FiArrowUpRight className="text-xl transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </motion.a>
          ) : (
            // Greyed-out placeholder shown until the form link is added
            <span className="mt-6 inline-flex cursor-not-allowed items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-base font-semibold text-emerald-100/50">
              {/* Placeholder text */}
              Application form coming soon
            </span>
          )}
          {/* Small note under the button */}
          <p className="mt-3 text-center text-xs text-emerald-100/50">
            {/* Note text */}
            You'll be taken to a short form to submit your request.
          </p>
        </motion.div>
      </div>

      {/* FREE GIFTS section, only if the laptop has gifts */}
      {laptop.gifts.length > 0 && (
        // Section that fades in when scrolled into view
        <motion.section {...sectionAnimation} className="mt-16">
          {/* Section heading with a gift icon */}
          <h2 className="flex items-center gap-3 text-2xl font-bold">
            {/* Gift icon in a small green square */}
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300">
              {/* The icon */}
              <FiGift />
            </span>
            {/* Heading text */}
            Free gifts included
          </h2>
          {/* Grid of gift cards: 1 column on small phones, 2 on larger phones, 3 on tablets and up */}
          <div className="mt-6 grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 md:grid-cols-3">
            {/* Make a card for each gift */}
            {laptop.gifts.map((gift) => (
              // One gift card: glass look
              <div
                // A unique key so React can keep track of each gift
                key={gift.name}
                // Glass card with padding
                className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md"
              >
                {/* White photo area */}
                <div className="overflow-hidden rounded-xl bg-white">
                  {/* The gift's photo */}
                  <img src={gift.image} alt={gift.name} className="aspect-square w-full object-contain p-4" />
                </div>
                {/* Gift name under the photo */}
                <p className="mt-3 text-center text-sm font-semibold text-white">
                  {/* The name */}
                  {gift.name}
                </p>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* SPECIFICATIONS section */}
      <motion.section {...sectionAnimation} className="mt-16">
        {/* Section heading with a chip icon */}
        <h2 className="flex items-center gap-3 text-2xl font-bold">
          {/* Chip icon in a small green square */}
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300">
            {/* The icon */}
            <FiCpu />
          </span>
          {/* Heading text */}
          Specifications
        </h2>
        {/* Grid of specs: 1 column on phones, 2 on tablets and up */}
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {/* Make a row for each spec */}
          {laptop.specs.map((spec) => {
            // Pick this spec's icon, or a tick icon if it isn't in the list
            const Icon = specIcons[spec.label] || FiCheckCircle
            // Return the spec row
            return (
              // One spec row: glass look, icon on the left, text on the right
              <div
                // A unique key so React can keep track of each spec
                key={spec.label}
                // Glass row with the icon and text side by side
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md"
              >
                {/* Icon in a small green square */}
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/15 text-lg text-emerald-300">
                  {/* The spec's icon */}
                  <Icon />
                </span>
                {/* Text area */}
                <div>
                  {/* Spec name in small green capitals */}
                  <p className="text-xs font-semibold uppercase tracking-widest text-emerald-300">
                    {/* e.g. "Processor" */}
                    {spec.label}
                  </p>
                  {/* Spec value in white */}
                  <p className="mt-1 text-sm text-white sm:text-base">
                    {/* e.g. "Intel Core i5-13420H, 8 cores, up to 4.6 GHz" */}
                    {spec.value}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </motion.section>
    </div>
  )
}

// Makes the details page available to App.jsx
export default Details