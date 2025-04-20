import { Flex } from "@mantine/core";

export default function About() {
    return (
    <Flex justify='center'>
      <Flex direction='column' maw={1000}>
        <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>
  
        <p className="text-lg mb-4">
          <strong>Helping Businesses Connect, One Card at a Time</strong>
        </p>
  
        <p className="text-base mb-4">
          Welcome to <strong>Business Cards</strong> – a simple, modern platform where businesses can showcase their services with ease.
        </p>
  
        <p className="text-base mb-4">
          We believe that every business, no matter how big or small, deserves a clean and accessible space to present who they are and how they can help. That’s why we created a system where companies can create digital cards that feature:
        </p>
  
        <ul className="list-disc list-inside mb-4">
          <li>Business name and logo</li>
          <li>A short description</li>
          <li>Contact details</li>
          <li>Links to websites or social media</li>
        </ul>
  
        <p className="text-base mb-4">
          Whether you're a local startup, a freelancer, or an established brand, your card helps people find and connect with you in just a few clicks.
        </p>
  
        <p className="text-base mb-4">
          <strong>Why We Built This</strong>
          <br />
          We noticed that a lot of businesses were struggling with online visibility—either stuck between complex website builders or social platforms that don’t quite fit. Our goal was to build something simple, clean, and effective. No fluff. Just useful info in a format that’s easy to browse.
        </p>
  
        <p className="text-base mb-4">
          <strong>What You Can Expect</strong>
        </p>
  
        <ul className="list-disc list-inside mb-6">
          <li>A clutter-free layout</li>
          <li>Easy card creation and editing</li>
          <li>Mobile-friendly display</li>
          <li>A growing network of businesses, all in one place</li>
        </ul>
  
        <p className="text-base">
          Thanks for stopping by. We’re excited to help you share your business with the world.
        </p>
      </Flex>
    </Flex>
    );
  }
  
