import type { PortableTextComponents } from '@portabletext/react'

export const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-3 text-ln-paragraph-md text-ln-gray-700">{children}</p>,
    h2: ({ children }) => <h2 className="mb-3 mt-6 text-lg font-550 text-ln-gray-900">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-2 mt-4 text-base font-550 text-ln-gray-900">{children}</h3>,
  },
  list: {
    bullet: ({ children }) => <ul className="mb-4 list-disc pl-6 text-ln-paragraph-md text-ln-gray-700">{children}</ul>,
    number: ({ children }) => <ol className="mb-4 list-decimal pl-6 text-ln-paragraph-md text-ln-gray-700">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-1">{children}</li>,
    number: ({ children }) => <li className="mb-1">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-600 text-ln-gray-900">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
  },
}
