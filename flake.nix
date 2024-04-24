{
  description = "art";

  inputs.flake-utils.url = "github:numtide/flake-utils";
  inputs.nixpkgs.url = "nixpkgs";

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem
      (system:
        let pkgs = import nixpkgs { inherit system; }; in
        {
          devShells.default = pkgs.mkShell {
					  name="Art";
						packages=with pkgs;[nodePackages_latest.typescript-language-server];
        	};
				});
} 
