export const CodeBlock = ({ children }: { children: string }) => (
  <div className="w-auto bg-gray-50 text-gray-500 font-mono leading-6 my-2 py-2 px-4 border border-gray-200 rounded-lg items-center whitespace-normal text-base sm:text-sm">
    {children}
  </div>
);

export const CodeString = ({ children }: { children: string }) => (
  <code className="bg-gray-50 text-gray-500 font-mono leading-6 py-0.5 px-2 border border-gray-200 rounded-lg items-center whitespace-normal text-base sm:text-sm">
    {children}
  </code>
);
