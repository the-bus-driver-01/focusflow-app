import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Tailwind CSS Demo</title>
        <meta name="description" content="Tailwind CSS configuration demo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6 text-center">
              Tailwind CSS is Working!
            </h1>
            <p className="text-xl text-gray-700 mb-8 text-center leading-relaxed">
              Your Tailwind CSS configuration is successfully set up in this Next.js application.
              You can now use Tailwind utility classes in your components.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Feature One</h2>
                <p className="text-gray-600">
                  This card demonstrates Tailwind CSS styling with responsive design.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Feature Two</h2>
                <p className="text-gray-600">
                  Resize your window to see the responsive grid layout in action.
                </p>
              </div>
            </div>
            <div className="text-center">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
