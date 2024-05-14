export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        Lora:['Lora','sans'],
        Poppins:['Poppins', 'sans-serif'],
        Forum:['Forum','curseive']
      },
      screens:{
        vvsm:"250px",
        vsm:"360px",
        ssm:"400px",
        sm:"640px",
        md:"768px",
        lg:"1024px",
        xl:"1280px"
      },
      
    },
  },
  plugins: [],
}