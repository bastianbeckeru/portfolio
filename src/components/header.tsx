import Link from 'next/link';

export default function Navbar() {
  return (
    <header>
      <nav className='fixed hidden top-0 w-full bg-white/80 backdrop-blur-sm border-b border-gray-100 z-50'>
        <div className='max-w-6xl mx-auto px-6 py-4'>
          <div className='flex justify-between items-center'>
            <Link href='#' className='text-xl font-semibold text-gray-900'>
              Bastián Becker
            </Link>
            <div className='hidden md:flex space-x-8'>
              <Link
                href='#about'
                className='text-gray-600 hover:text-gray-900 transition-colors'
              >
                About
              </Link>
              <Link
                href='#projects'
                className='text-gray-600 hover:text-gray-900 transition-colors'
              >
                Projects
              </Link>
              <Link
                href='#contact'
                className='text-gray-600 hover:text-gray-900 transition-colors'
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
