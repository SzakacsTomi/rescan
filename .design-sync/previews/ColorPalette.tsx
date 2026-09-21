import { ColorPalette } from 'rescan';

export const BrandSurfaces = () => <ColorPalette family="brand" />;
export const SemanticRoles = () => <ColorPalette family="semantic" />;
export const SemanticRolesDark = () => (
  <div className="dark bg-background">
    <ColorPalette family="semantic" />
  </div>
);
