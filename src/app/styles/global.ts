export const tabBaseClasses = `
  inline-flex items-center justify-center w-full h-12 gap-2 px-6 -mb-px
  text-sm font-medium tracking-wide duration-300 border-b-2 rounded-t
  focus-visible:outline-none whitespace-nowrap disabled:cursor-not-allowed
  cursor-pointer
`;

export const tabActiveClasses = `
  border-emerald-500 hover:border-emerald-600 focus:border-emerald-700
  text-emerald-500 hover:text-emerald-600 focus:text-emerald-700
  hover:bg-emerald-50 focus:bg-emerald-50
  stroke-emerald-500 hover:stroke-emerald-600 focus:stroke-emerald-700
  cursor-pointer
`;

export const tabInactiveClasses = `
  border-transparent hover:border-slate-300
  text-slate-500 hover:text-slate-600
  hover:bg-slate-50
  stroke-slate-500 hover:stroke-slate-600
  cursor-pointer
`;
export const dropzoneStyles = {
	container: "relative my-6",
	input: "hidden",
	label:
		"relative flex flex-col items-center gap-4 px-3 py-6 text-sm font-medium text-center transition-colors border border-dashed rounded cursor-pointer border-slate-300",
	iconContainer:
		"inline-flex items-center self-center justify-center h-12 px-3 rounded-full bg-slate-100/70 text-slate-400",
	text: "text-slate-500",
	highlightText: "text-emerald-500",
};