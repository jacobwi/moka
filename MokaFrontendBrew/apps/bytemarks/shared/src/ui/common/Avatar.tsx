import { useEffect, useState } from 'react';
import DefaultAvatar from '../../assets/user-avatar.png';
import { MdCameraAlt } from 'react-icons/md';

interface AvatarProps {
  src: string;
  alt: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  editable?: boolean;
  base64?: boolean;
  onAvatarChange?: (newAvatar: string) => void;
  onClick?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  className = '',
  size = 'md', // Default size
  editable = false,
  base64 = false,
  onAvatarChange,
  onClick,
}) => {
  const [avatarSrc, setAvatarSrc] = useState<string>(src || DefaultAvatar);
  const [inputId] = useState(
    `avatar-upload-${Math.random().toString(36).substr(2, 9)}`
  );

  // Size mapping
  const sizeClasses = {
    sm: 'w-12 h-12', // Small size
    md: 'w-24 h-24', // Medium size (default)
    lg: 'w-32 h-32', // Large size
  };

  useEffect(() => {
    setAvatarSrc(src || DefaultAvatar);
  }, [src]);

  const determineSrc = (src: string): string =>
    base64 ? `data:image/jpeg;base64,${src}` : src;

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newAvatarSrc = reader.result as string;
        setAvatarSrc(newAvatarSrc);
        onAvatarChange?.(newAvatarSrc);
      };
      reader.onerror = error => console.error('FileReader error: ', error);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      onClick={onClick}
      className={`relative inline-block ${className} group ${sizeClasses[size]}`}
    >
      <img
        src={determineSrc(avatarSrc)}
        alt={alt}
        className="rounded-full shadow-lg transition-all duration-300 ease-in-out w-full h-full object-cover"
      />
      {editable && (
        <div className="absolute rounded-full inset-0 bg-black bg-opacity-40 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
          <label
            htmlFor={inputId}
            className="bg-white bg-opacity-80 rounded-full p-2 border border-gray-300 cursor-pointer"
            aria-label="Change avatar"
          >
            <MdCameraAlt className="text-theme-accent text-lg" />
            <input
              type="file"
              id={inputId}
              className="hidden"
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default Avatar;
