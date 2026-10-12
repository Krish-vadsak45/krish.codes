export type AppId = 'finder' | 'terminal' | 'safari' | 'settings' | 'notes' | 'mail';

export interface WindowState {
  id: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  exitType?: 'close' | 'minimize';
  openSource?: 'dock' | 'desktop';
}

export interface AppMetadata {
  id: AppId;
  title: string;
  icon: string;
  defaultSize: { width: number; height: number };
  defaultPosition: { x: number; y: number };
}

export interface DesktopThemeConfig {
  wallpaper: 'cosmic' | 'sequoia' | 'cyber';
  blurLevel: 'low' | 'normal' | 'high';
}
