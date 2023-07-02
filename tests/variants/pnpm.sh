function x_install {
  pnpm install $@
}

function x_terraform {
  pnpm exec terraform $@
}
