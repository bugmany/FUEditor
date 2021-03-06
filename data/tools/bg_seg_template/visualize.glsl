
vec4 shader_main(vec2 st_src,vec4 C){
	vec2 delta=st_src*inv_matrix45_image_dim.zw-inv_matrix45_image_dim.xy;
	vec4 mul=delta.xyxy*inv_matrix0123;
	vec2 uv = mul.xz+mul.yw;
	
	float alpha=texture2D(tex_segmentation,uv).w;
	
	//inverse
	if(flipx != 0.0) uv.x = 1.0 - uv.x;
	if(flipy != 0.0) uv.y = 1.0 - uv.y;
	
	vec2 uv_tmp = uv * 2.0 - vec2(1.0);
	uv.x = mat_seg[0] * uv_tmp.x + mat_seg[2] * uv_tmp.y;
	uv.y = mat_seg[1] * uv_tmp.x + mat_seg[3] * uv_tmp.y;
	uv = (uv + vec2(1.0)) * 0.5;
	
	if(alpha>0.8){
		return C;
	}else{
		if(is_bgra>0.5){
			C = C.bgra;
		}
		vec2 bgrt = background_uv_lt.zw;
		vec2 bglb = background_uv_rb.zw;
		vec2 bgwh = bgrt - bglb;
		vec2 bguv = vec2(bglb.x + bgwh.x*(1.0-uv.x), 1.0-(bglb.y + bgwh.y*(1.0-uv.y)));
		
		vec4 bg_color = texture2D(tex_background,bguv);
		float bg_alpha = bg_color.w;
		vec4 retcol;
		if(alpha>0.6){
			alpha = (alpha-0.6)/(0.2);
			vec4 blendc = C*(alpha) + bg_color*(1.0-alpha);
			retcol = vec4((C*(1.0-bg_alpha)+bg_alpha*blendc).xyz,1.0);
		}else{
			retcol = vec4((bg_color*bg_alpha+(1.0-bg_alpha)*C).xyz,1.0);
		}
		if(is_bgra>0.5){
			return vec4(retcol.zyx,1.0);
		}else{
			return retcol;
		}
	}
}
