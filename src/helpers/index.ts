export function overflowBodyHidden(value: boolean) {
	if(value === true) {
      document.body.style.overflow = "hidden";
	} else {
      document.body.style.overflow = "auto";
      document.body.style.overflow = "overlay";
	}
}