import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Koma Custom Colors
				'mac-red': 'hsl(var(--mac-red))',
				'mac-yellow': 'hsl(var(--mac-yellow))',
				'mac-green': 'hsl(var(--mac-green))',
				'blue-accent': 'hsl(var(--blue-accent))',
				'orange-accent': 'hsl(var(--orange-accent))',
				'green-accent': 'hsl(var(--green-accent))',
				'purple-accent': 'hsl(var(--purple-accent))',
				'heading-primary': 'hsl(var(--heading-primary))'
			},
			backgroundImage: {
				'gradient-blue': 'var(--gradient-blue)',
				'gradient-orange': 'var(--gradient-orange)',
				'gradient-green': 'var(--gradient-green)',
				'gradient-purple': 'var(--gradient-purple)',
				'heading-gradient': 'var(--heading-gradient)'
			},
			boxShadow: {
				'mac': 'var(--mac-shadow)',
				'glow-blue': '0 0 40px hsl(var(--blue-accent) / 0.3)',
				'glow-orange': '0 0 40px hsl(var(--orange-accent) / 0.3)',
				'glow-green': '0 0 40px hsl(var(--green-accent) / 0.3)',
				'glow-purple': '0 0 40px hsl(var(--purple-accent) / 0.3)'
			},
			transitionTimingFunction: {
				'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
				'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '.7' }
				},
				'bounce-gentle': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' }
				},
				'glow': {
					'0%, 100%': { boxShadow: '0 0 20px hsl(var(--primary) / 0.3)' },
					'50%': { boxShadow: '0 0 30px hsl(var(--primary) / 0.6), 0 0 40px hsl(var(--primary) / 0.3)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'pulse-slow': 'pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'bounce-gentle': 'bounce-gentle 2s infinite',
				'shimmer': 'shimmer 2s infinite',
				'glow': 'glow 2s ease-in-out infinite alternate'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
