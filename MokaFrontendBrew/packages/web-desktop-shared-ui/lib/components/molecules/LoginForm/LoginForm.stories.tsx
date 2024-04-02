import { Meta, StoryObj } from '@storybook/react';
import LoginForm from './LoginForm';
import { fn } from '@storybook/test';

const meta: Meta<typeof LoginForm> = {
    title: 'Molecules/LoginForm',
    component: LoginForm,
    decorators: [
        (Story) => (
            <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
                <Story />
            </div>
        ),
    ],
    args: {
        onForgotPassword: fn()
    }
    ,
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['default', 'compact', 'withImage', 'withLogo', 'floatingLabels', 'edgeless', 'inline'],
        },
        error: {
            control: { type: 'text' }
        },
        imageUrl: {
            control: { type: 'text' },
            table: {
                category: 'withImage Variant',
            },
        },
        logoUrl: {
            control: { type: 'text' },
            table: {
                category: 'withLogo Variant',
            },
        },
    },
};

export default meta;

export const Default: StoryObj<typeof LoginForm> = {
    args: {
        variant: 'default',
    },
};

export const Compact: StoryObj<typeof LoginForm> = {
    args: {
        variant: 'compact',
    },
};

export const WithImage: StoryObj<typeof LoginForm> = {
    args: {
        variant: 'withImage',
        imageUrl: 'https://via.placeholder.com/600x400', // Placeholder image URL
    },
};

export const WithLogo: StoryObj<typeof LoginForm> = {
    args: {
        variant: 'withLogo',
        logoUrl: 'https://via.placeholder.com/150', // Placeholder logo URL
    },
};


export const Edgeless: StoryObj<typeof LoginForm> = {
    args: {
        variant: 'edgeless',
    },
};

export const Inline: StoryObj<typeof LoginForm> = {
    args: {
        variant: 'inline',
    },
};

export const WithError: StoryObj<typeof LoginForm> = {
    args: {
        error: 'Invalid username or password',
    },
};

