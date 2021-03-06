(function(){
	/*
	以下的注释用来给编辑器提供参数。格式为：
		gparam或mparam 名字 控件信息
	gparam代表全局参数，mparam代表材质参数。
	控件信息是用JSON写的，一共有三大类控件：
		{"type":"edit"}：字符串参数用的编辑框，可以用"default_value"提供默认值
		{"type":"texture"}：贴图参数用的按钮，可以用"default_value"提供默认值
		{"type":"slider"}：数值参数用的条儿，可以用"default_value"提供默认值，"min"和"max"提供最小/最大值
	参数名称其实是可以用中文的，但是改了参数名的话原先调的值就没了，所以最好还是用“代码状”的名字比较好，
	一旦写定就不要随便改，宁可在旁边加注释。
	*/
	//物体名，别忘了设哦～ 千万别忘了设哦～～ 如果设成了"unnamed"可是会打警告的哦～～～
	//@#gparam name {"type":"edit","default_value":"unnamed"}
	//环境图
	//@gparam tex_light_probe {"type":"texture","default_value":"beach_1_4.jpg"}
	//环境图的旋转角度
	//@gparam envmap_shift {"type":"slider","min":0,"max":1,"default_value":0.75}
	//环境图的视角
	//@gparam envmap_fov {"type":"slider","min":0.5,"max":5,"default_value":1.0}
	//道具整体缩放的比例，用对数调节是为了方便
	//@gparam log_scale {"type":"slider","min":-5,"max":5,"default_value":0}
	//眼球左右旋转的倍率
	//@gparam eyeRscale {"type":"slider","min":0.0,"max":1.0,"default_value":1.0}
	///////////////////////////
	/*
	以下是光源参数。出于节省起见，现在只用了两个光。主光L0负责主要的照明，补光L1把侧面补亮。只有主光会产生高光。
	将来有需求的话可以把shader里L2的注释去掉，加个背光什么的。
	现在的光源都没有产生阴影。有需求请联系我们，在系统里加一下。
	*/
	//主光的航向角，也就是左右转的那个角
	//@gparam L0_yaw {"type":"slider","min":0,"max":1,"default_value":0}
	//主光的俯仰角，也就是上下转的那个角
	//@gparam L0_pitch {"type":"slider","min":-1,"max":1,"default_value":0}
	//主光的颜色，三个通道
	//@gparam L0_R {"type":"slider","min":0,"max":1,"default_value":1}
	//@gparam L0_G {"type":"slider","min":0,"max":1,"default_value":1}
	//@gparam L0_B {"type":"slider","min":0,"max":1,"default_value":1}
	//主光的强度，用对数调还是为了方便
	//@gparam L0Intensity {"type":"slider","min":-4,"max":4,"default_value":0}
	//补光的参数，和主光一样的。再次重申，补光不产生高光。
	//@gparam L1_yaw {"type":"slider","min":-0.5,"max":0.5,"default_value":0}
	//@gparam L1_pitch {"type":"slider","min":-1,"max":1,"default_value":0}
	//@gparam L1_R {"type":"slider","min":0,"max":1,"default_value":1}
	//@gparam L1_G {"type":"slider","min":0,"max":1,"default_value":1}
	//@gparam L1_B {"type":"slider","min":0,"max":1,"default_value":1}
	//@gparam L1Intensity {"type":"slider","min":-4,"max":4,"default_value":-2}
	//半透明算法阈值，设为1.0适合普通简单的半透明物体，设为0.5适合头发
	//@gparam alphaThreshold {"type":"edit","default_value":"1.0"}
	//是否固定位置,不跟随人脸运动，固定位置如下fixed_x/y/z
	//在没有人脸的时候的固定位置
	//@gparam is_fix_x {"type":"slider","min":0,"max":1,"default_value":0}
	//@gparam is_fix_y {"type":"slider","min":0,"max":1,"default_value":0}
	//@gparam is_fix_z {"type":"slider","min":0,"max":1,"default_value":0}
	//@gparam fixed_x {"type":"slider","min":-600,"max":600,"default_value":0}
	//@gparam fixed_y {"type":"slider","min":-600,"max":600,"default_value":0}
	//@gparam fixed_z {"type":"slider","min":0,"max":2000,"default_value":350}
	//在没有人脸的时候是否绘制
	//@gparam isnofacerender {"type":"slider","min":0,"max":1,"default_value":0}
	//@gparam fixed_nx {"type":"slider","min":-600,"max":600,"default_value":0}
	//@gparam fixed_ny {"type":"slider","min":-600,"max":600,"default_value":0}
	//@gparam fixed_nz {"type":"slider","min":0,"max":2000,"default_value":350}
	
	//@gparam use_fov {"type":"slider","min":0,"max":1,"default_value":0}
	//@gparam camera_fov {"type":"slider","min":5,"max":90,"default_value":20}
	//控制旋转的幅度，rot_weight=1完全按照人头旋转，rot_weight=0不跟人头旋转
	//@gparam rot_weight {"type":"slider","min":0,"max":1,"default_value":1}	
	//@gparam expr_clamp {"type":"slider","min":0,"max":1,"default_value":0}	
	///////////////////////////
	//以下是材质参数
	/*物体的类型,一是镂空,[0,0.25]；
				二是会完全随着脑袋旋转和缩放,(0.25,0.5]；
				三是权重控制旋转的幅度（前提是有对应主obj的weight.png,例如aa.obj对应的权重贴图是aa_weight.png）,(0.5,0.75]；
				四是只会跟着脑袋位移变化和大小的缩放，例如身体(0.75,1]。
	*/
	//@mparam obj_type {"type":"slider","min":0,"max":1,"default_value":0.3}
	
	//法向贴图，就是蓝了吧唧的那种，不是bump map哦～bump map要先转一下哦～～ 默认的grey.png等于没有贴图
	//@mparam tex_normal {"type":"texture","default_value":"grey.png"}
	//法向贴图的强度，为了照顾没有法向贴图的模型，强度默认是0，所以设了法向贴图之后要把强度拽高点才能看到效果
	//@mparam normal_strength {"type":"slider","min":0,"max":1,"default_value":0}
	//颜色贴图，默认的white.png是白的。建议先弄好贴图再去调光哦。
	//@mparam tex_albedo {"type":"texture","default_value":"white.png","isTex":1}
	//自发光强度
	//@mparam Ka {"type":"slider","min":0,"max":1,"default_value":0}
	//漫反射强度
	//@mparam Kd {"type":"slider","min":0,"max":1,"default_value":0.3}
	//高光强度，注意高光不受颜色贴图影响
	//@mparam Ks {"type":"slider","min":0,"max":1,"default_value":0.2}
	//环境图反射强度
	//@mparam Kr {"type":"slider","min":0,"max":1,"default_value":0.0}
	//表面粗糙度。越大高光越分散，越小高光越集中
	//@mparam roughness {"type":"slider","min":0.02,"max":1,"default_value":0.5}
	//高光强度贴图，应为灰度图，越大表示越亮。
	//@mparam tex_smoothness {"type":"texture","default_value":"grey.png"}
	//高光强度贴图的整体强度（有些拗口……），为了照顾到大多数没有高光强度贴图的模型，默认是0。设了贴图之后要把强度拽高哦～
	//@mparam has_tex_smoothness {"type":"slider","min":0,"max":1,"default_value":0}
	//环境图反射的折射率。折射率越小，反射从正面到边光的亮度变化越明显，整体强度越小。
	//@mparam ior {"type":"slider","min":1.01,"max":2.00,"default_value":1.33}
	//高光的金属度。越高越接近金属，越低越接近塑料。
	//@mparam F0 {"type":"slider","min":0,"max":1,"default_value":1.0}
	//这个材质是不是眼睛的标记
	//@mparam is_eye {"type":"slider","min":0,"max":1,"default_value":0}
	//这个材质是不是头发的标记
	//@mparam is_hair {"type":"slider","min":0,"max":1,"default_value":0}
	
	
	/*
	编辑器保存的结果会存放在"globals.json"和"materials.json"两个文件中。
	但在保存之前这两个文件是不存在的，所以要考虑到ReadFromCurrentItem失败的情况。
	"globals.json"直接就是把所有的全局参数放一起的一个对象：
		{
			"参数名":"值",
			……
		}
	"materials.json"的结构是：
		{
			"材质名":{
				"参数名":"值",
				……
			},
			"材质名":{
				……
			},
			……
		}
	"材质名"和blendshape.drawcalls[i].name是一一对应的。
	*/
	/////////////////////////util
	var last_focallength = 0;
	var isReady = 0;
	var pre_trs_x = 0;
	var pre_trs_y = 0;
	var pre_scale = 1;
	var post_trs_z = 3000;
	var eyepos = [];
	var isActionTriggered=function (actionname, params){
		if(params.expression==undefined || params.rotation==undefined)return false;
		switch (actionname){
			
			case "taimei":
				return params.expression[16] >= 0.4 || params.expression[17] >= 0.4 || params.expression[18] >= 0.4;
				break;

			case "taizuijiao_zuo":
				return params.expression[24] >= 0.4 || params.expression[28] >= 0.4;
				break;

			case "taizuijiao_you":
				return params.expression[23] >= 0.4 || params.expression[27] >= 0.4;
				break;

			case "nu":
				return params.expression[42] >= 0.5;
				break;

			case "zuixing_o":
				return params.expression[38] >= 0.4;
				break;

			case "zuixing_a":
				return params.expression[21] >= 0.3;
				break;

			case "zuixing_du":
				return params.expression[39] >= 0.5;
				break;

			case "zuixing_min":
				return params.expression[33] >= 0.5 || params.expression[34] >= 0.5;
				break;

			case "zuixing_guqi":
				return params.expression[43] >= 0.5;
				break;

			case "biyan_zuo":
				return params.expression[1] >= 0.5;
				break;

			case "biyan_you":
				return params.expression[0] >= 0.5;
				break;

			case "zhuantou_zuo":
				return params.rotation[1] >= 0.1;
				break;

			case "zhuantou_you":
				return params.rotation[1] >= 0.1;
				break;

			default:
				return false;
				break;
		}
	};
	
	var quaterionSlerp=function(p,q,t){
		var sum = 0;
		for(var i =0;i<4;i++)sum+=p[i]*q[i];
		var theta = Math.acos(sum);
		var ws = Math.sin(theta);
		var w1 = Math.sin((1.0 - t)*theta)/ws;
		var w2 = Math.sin(t * theta)/ws;
		var qret = new Array();
		sum = 0;
		for(var i =0; i < 4; i++){
			qret[i] = w1 * p[i] + w2 * q[i];
			sum += qret[i] * qret[i];
		}
		sum = Math.sqrt(sum);
		for(var i =0; i < 4; i++)qret[i]/=sum;
		return qret;
	}
	//////////////////////////////
	
	
	var globals=JSON.parse(FaceUnity.ReadFromCurrentItem("globals.json")||"{}");
	var materials_json=JSON.parse(FaceUnity.ReadFromCurrentItem("materials.json")||"{}");
	//下面是正常的三维道具绘制流程
	var s_vert_shader=FaceUnity.ReadFromCurrentItem("3d_vert.glsl");
	var s_frag_shader = FaceUnity.ReadFromCurrentItem("3d_frag.glsl");
	
	var s_frag_teeth_shader=FaceUnity.ReadFromCurrentItem("3d_frag_teeth.glsl");
	var tex_teeth_ao = FaceUnity.LoadTexture("teeth_ao.webp",0);
	
    //骨骼动画相关
	var a_vert_shader = FaceUnity.ReadFromCurrentItem("anim_dq_vert.glsl");
	var fbxmeshs = JSON.parse(FaceUnity.ReadFromCurrentItem("meshes.json"));
	
	var bigtexjson = JSON.parse(FaceUnity.ReadFromCurrentItem("3d_bigtex_desc.json")||"{}");
	var bigtexcnt = 0;
	var bigtex = new Array();
	if(bigtexjson["bigtexs"]!=undefined){
		for(var i=0;i<bigtexjson["bigtexs"].length;i++){
			bigtex[bigtexcnt] = FaceUnity.LoadTexture(bigtexjson["bigtexs"][i],0);
			bigtexcnt++;
		}
	}
	console.log("bigtexcnt",bigtexcnt);
	var now = Date.now();
	var expression=[]; for(var i=0; i<46; i++) expression.push(0);
	var focal_length = 303.64581298828125;
	//背景动画
	//var bg_board=JSON.parse(FaceUnity.ReadFromCurrentItem("desc.json"));
	//var tex_bg=FaceUnity.LoadTexture("bg.jpg");
	//var tex_joker = FaceUnity.LoadTexture("joker.png");
	/*
	从这里开始开始涉及到编辑器中需要操作的参数。为了加快编辑速度，需要在script.js中提供动态重载的接口，
	所以这里在初始化时并没有设置参数值，而是抽象出了一个ReloadThingsForEditor函数供编辑器随时调用。
	*/
	var g_params={
		is3DFlipH: 0.0,
		isFlipExpr: 0.0,
		weightOffset:[0.0,0.0,0.0],
		isAndroid: 0.0,
	};
	var faces = [];
	var tex_map={};
	var SCALE = 1;
	var tex_light_probe;
	var L0_dir,L1_dir,L0_color,L1_color;
	//接下来是一些工具函数
	/**
	* \brief 给每个参数提供默认值的辅助函数。注意注释里的"default_value"只在UI上起作用，现在真的默认值还得在JS里再写一次。
	* \param v0 参数值
	* \param v1 默认值
	*/
	var V=function(v0,v1){
		return v0==undefined?v1:v0;
	};
	var Vs = function (v0, v1) { return v0 == undefined ? v1 : v0.slice(); };
	/**
	* \brief 根据欧拉角计算方向向量的辅助函数。用来帮助调节光源方向
	* \param yaw 航向角
	* \param pitch 俯仰角
	*/
	var CreateDirection=function(yaw,pitch){
		yaw*=2.0*3.1415926;
		pitch*=0.5*3.1415926;
		return [Math.cos(pitch)*Math.sin(yaw),-Math.sin(pitch),Math.cos(pitch)*Math.cos(yaw)];
	};
	/**
	* \brief 把颜色三通道和对数光强搞在一起的辅助函数
	* \param R 红色
	* \param G 绿色
	* \param B 蓝色
	* \param log_intensity 对数光强
	*/
	var CreateColor=function(R,G,B,log_intensity){
		var L=Math.exp(log_intensity);
		return [L*R,L*G,L*B]
	};
	/// \brief 提供给编辑器，用来重新初始化参数的函数
	var ReloadThingsForEditor=function(){
		//基本就是一通乱算，把适合图形界面调节的参数转化为适合shader使用的参数
		SCALE=Math.exp(V(globals.log_scale,0));
		L0_dir=CreateDirection(V(globals.L0_yaw,0),V(globals.L0_pitch,0));
		L1_dir=CreateDirection(V(globals.L1_yaw,0),V(globals.L1_pitch,0));
		L0_color=CreateColor(V(globals.L0_R,1),V(globals.L0_G,1),V(globals.L0_B,1), V(globals.L0Intensity,0));
		L1_color=CreateColor(V(globals.L1_R,1),V(globals.L1_G,1),V(globals.L1_B,1), V(globals.L1Intensity,-2));
		//编辑器在改了贴图之后会自动把文件转换成webp拷贝到工作区里，但是并不会帮着调LoadTexture，所以这里要调一下
		tex_light_probe=FaceUnity.LoadTexture(V(globals.tex_light_probe,"beach_1_4.jpg"),0,gl.CLAMP_TO_EDGE);
	};
	//就算在没有编辑器的时候，总也还是要初始化一次的
	ReloadThingsForEditor();
	//背景不动
	var bg_board={
		"type":"billboard_ex2",
		"base_vertex":-1,
		"enable_depth_test":1,
		//"shader":FaceUnity.ReadFromCurrentItem("bg.glsl"),
	};
	
	var AnimCounter={
		names:{},
		count:0,
		total:0,
		finish:function(name){
			if(this.names[name])return;
			this.names[name] = 1;
			this.count++;
		},
		hasFinish:function(){
			console.log("3d finish cnt",this.count);
			return this.count >= 1 ? 1:0;
		},
		allFinish:function(){
			console.log("3d finish cnt",this.count);
			return (this.count >= this.total && this.total!=0) ? 1 : 0;
		}
	}
	
	var deepCopy =function(p, c){
		var c = c || {};
		for (var i in p) {
			if (typeof p[i] === 'object') {
				c[i] = (p[i].constructor === Array) ? [] : {};
				deepCopy(p[i], c[i]);
			} else {
				c[i] = p[i];
			}
		}
		return c;
	}

	var Mesh = function(dc,anim){
	    deepCopy(dc, this);
	    if (anim != null && anim != undefined)
	        deepCopy(anim, this);
		this.itemtype=3;
		if(this.betriggered==undefined)this.isActive = true;
		this.has_tex_albedo_frames = true;
		if(this.tex_albedo_frames==undefined){
			this.tex_albedo_frames = [{}];
			this.has_tex_albedo_frames = false;
		}
		this.isFinished = 0;
	}
	Mesh.prototype.switchState = function(lst,now){
		if(this.betriggered || this.isFinished)return;
		if(lst==0 && now==1){
			if(this.triggerstart=="newface")this.isActive = true;
		}
		if(lst==1 && now==0){
			if(this.triggerstart=="alwaysrender")this.isActive = true;
		}
	}
	Mesh.prototype.stopThis = function(now, animCounter){
		console.log("stopThis:",this.name);
		if(!this.triggered)return;
		this.triggered =0;
		this.frame_id = 0;
		this.last = now;
		this.activateNext();
		if(this.triggerstart=="newface"||this.triggerstart=="alwaysrender"){
			this.isActive = false;
		}	
		if(this.isactiveonce==1){
			this.isFinished=1;
			animCounter.finish(this.name);
		}
	}
	Mesh.prototype.stop = function (now, animCounter) {
	    this.stopThis(now, animCounter);
	}
	Mesh.prototype.activateNext = function(){
		if(this.triggerNextNodesRef==undefined || this.triggerNextNodesRef.length==0)return;
		for(var idx in this.triggerNextNodesRef){
			if(this.triggerNextNodesRef[idx].isFinished==0){
				this.triggerNextNodesRef[idx].isActive=true;
			}
		}
	}
	Mesh.prototype.triggerThis=function(now){
		if(this.isFinished==1)return;
		this.triggered = 1;
		this.frame_id = 0;
		this.last = now;
		this.isActive = true;
		console.log("thriggerThis3d",this.name);
	}
	Mesh.prototype.triggerStartEvent = function (params, now, isNoneFace) {
		if(this.triggered || !this.isActive)return;
		if((!isNoneFace && (this.triggerstart=="newface" || (this.triggerstart=="faceaction" && isActionTriggered(this.startaction,params))))
			||(isNoneFace && this.triggerstart=="alwaysrender")){		 
				this.triggerThis(now);
		}
	}
	Mesh.prototype.updateEvent = function(params,now){
		var matex=(materials_json[this.name]||{});
		
		var rotation = params.rotation.slice();
		
		if(V(globals.rot_weight,1.0) < 0.05){
			rotation = [0,0,0,1];
		}else if(V(globals.rot_weight,1.0) < 0.95){
			var delta = [-rotation[0],-rotation[1],-rotation[2],1.0-rotation[3]];
			var w=1.0 - globals.rot_weight;
			rotation=[w*delta[0]+rotation[0],w*delta[1]+rotation[1],w*delta[2]+rotation[2],w*delta[3]+rotation[3]];
		}
		/*
		if(V(globals.rot_weight,1.0) < 0.01){
			rotation = [0,0,0,1];
		}else if(V(globals.rot_weight,1.0) < 0.99){
			if(Math.abs(rotation[0])<0.00001 && Math.abs(rotation[1])<0.00001 && Math.abs(rotation[2])<0.00001 && Math.abs(rotation[3] - 1.0)<0.00001){
				rotation = [0,0,0,1];
			}else{
				rotation = quaterionSlerp([0,0,0,1], rotation, V(globals.rot_weight,1.0)).slice();
			}
		}
		*/
		
		var mat=FaceUnity.CreateViewMatrix(
			[-rotation[0],-rotation[1],-rotation[2],rotation[3]],
			params.translation);
		var mat_cam=FaceUnity.CreateViewMatrix(
			[0,0,0,1],
			params.translation);
		if(V(matex.is_eye,this.is_eye)){
			mat=FaceUnity.MatrixMul(
				FaceUnity.CreateEyeMatrix(
					[this.P_center[0]*SCALE,this.P_center[1]*SCALE,-this.P_center[2]*SCALE],
					[params.pupil_pos[0]*V(globals.eyeRscale,1.5),params.pupil_pos[1]]),
				mat);
		}
		this.use_custom_gl_states=1;
		this.use_OIT_shader=1;

		if(V(matex.obj_type,0.3)>0.75){
			var center=[3.329,-90.223,-4.394];
			var mat2=FaceUnity.MatrixMul(
				[
					1,0,0,0,
					0,1,0,0,
					0,0,1,0,
					center[0],center[1],center[2],1],
				mat
			);
			mat=FaceUnity.CreateViewMatrix(
				[0,0,0,1],
				[mat2[12]-center[0],mat2[13]-center[1],mat2[14]-center[2]]);
		}
		this.rotation = rotation;
		this.mat = mat;
		this.mat_cam = mat_cam;
		if(this.triggered){
			var elapse = now - this.last;
			this.frame_id = parseInt(elapse * this.fps / 1000);
			if(this.force_frame_id!=undefined && this.force_frame_id>=0)this.frame_id = this.force_frame_id;
		}
	}
	Mesh.prototype.triggerEndEvent = function (params, now, isNoneFace, animCounter) {
		if(this.triggered!=1)return;
		if(!isNoneFace){
			if(this.triggerend=="newface"){
			    this.stop(now, animCounter); return;
			}
			if(/*action end*/this.triggerend=="faceaction" && isActionTriggered(this.endaction,params)){
			    this.stop(now, animCounter);
			}
			if(this.triggerstart=="alwaysrender")return;
			
			if(/*action keep*/this.triggerstart=="faceaction" && this.needkeepfaceaction== 1 && !isActionTriggered(this.startaction,params)){
			    this.stop(now, animCounter);
			}
		}else{
			if(this.triggerstart!="alwaysrender")return;
		}
		
		if(/*loop end*/this.looptype=="loopcnt" && ((this.frame_id +1) >= this.tex_albedo_frames.length * this.loopcnt)){
		    this.stop(now, animCounter);
		}
	}
	
	Mesh.prototype.renderEvent = function (blendshape, params, pass, shader, animation, fid) {
	    if (!this.triggered || !this.isActive) return;
		var matex=(materials_json[this.name]||{});
		if(this.has_tex_albedo_frames==true){
			var albedo = bigtex[this.tex_albedo_frames[this.frame_id % this.tex_albedo_frames.length].bigtexidx];
			var lbrt = this.tex_albedo_frames[this.frame_id % this.tex_albedo_frames.length].lbrt;
		}else{
			var albedo = tex_map[V(matex.tex_albedo,this.mat.tex)];
			var lbrt = [0.0,0.0,1.0,1.0];
		}
		var shaderUse = s_vert_shader;
		if(nama_minw_fov!=undefined){
			//var mat_proj = FaceUnity.CreatePicassoProjectionMatrix(g_picasso_width,g_picasso_height,dde_focal_length);
			var mat_proj = FaceUnity.CreateProjectionMatrix_FOV(nama_minw_fov,0.1);
		}else{
			var mat_proj = FaceUnity.CreateProjectionMatrix();
		}
		var shaderParams = {
		    scales: [this.scales[0] * SCALE, this.scales[1] * SCALE, this.scales[2] * SCALE],
		    mat_view: this.mat,
		    mat_cam: this.mat_cam,
		    quatR1:[this.rotation[0],this.rotation[1],this.rotation[2],this.rotation[3]],
		    quatT1: [0, 0, 0],//[params.translation[0],params.translation[1],params.translation[2],1],
		    quatR2: [0, 0, 0, 1],
		    quatT2: [0, 0, 0],//[mat2[12]-center[0],mat2[13]-center[1],mat2[14]-center[2]],
		    obj_type: V(matex.obj_type, 0.3),
		    mat_proj: mat_proj,
		    tex_albedo: albedo,
		    lbrt: lbrt,
		    tex_normal: tex_map[V(matex.tex_normal, "grey.png")],
		    tex_smoothness: tex_map[V(matex.tex_smoothness, "grey.png")],
		    normal_strength: V(matex.normal_strength, 0.0),
		    tex_light_probe: tex_light_probe,
		    envmap_shift: V(globals.envmap_shift, 0.75),
		    envmap_fov: V(globals.envmap_fov, 1.0),
		    Ka: V(matex.Ka, 0.0), Kd: V(matex.Kd, 0.3), Ks: V(matex.Ks, 0.2), Kr: V(matex.Kr, 0.0),
		    roughness: V(matex.roughness, 0.5),
		    has_tex_smoothness: V(matex.has_tex_smoothness, 0.0),
		    is_hair: pass > 0,
		    ior: V(matex.ior, 1.33),
		    F0: V(matex.F0, 1.0),
		    L0_dir: L0_dir, L0_color: L0_color,
		    L1_dir: L1_dir, L1_color: L1_color,
		    isFlipH: g_params['is3DFlipH'],
		    weightOffset: g_params['weightOffset'],
			depth_hack:V(matex.depth_hack,0.0),
		    //L2_dir:[0.25,0,-1],L2_color:[2.0,2.0,2.0],
			pre_trs_x : pre_trs_x,
			pre_trs_y : pre_trs_y,
			pre_scale : pre_scale,
			post_trs_z : post_trs_z,
			is_teeth:0,
			teeth_tm:[1, 0, 0, 0,
                                      0, 1, 0, 0,
                                      0, 0, 1, 0,
                                      0, 0, 0, 1]
		};
		if(this.name=="teenth"){
			var tm = [];
			for(var i = 0;i<16;i++)tm.push(g_teeth_tm[i]);
			shaderParams.tex_ao=tex_teeth_ao;
			shaderParams.teeth_tm=tm;
			shaderParams.is_teeth=1;
		}

		var globalTranslation = Vs(FaceUnity.globalTranslation, [0, -98, 1243, 1]);
		var globalRotationQuat = Vs(FaceUnity.globalRotationQuat, [0, 0, 0, 1]);

		if (animation != null) {
		    shaderUse = a_vert_shader;
		    shaderParams.fid = fid;
		    shaderParams.animating = animation.animating;
		    shaderParams.tex_deform = animation.tex_deform;
		    shaderParams.deform_width = animation.tex_deform_width;
		    shaderParams.anim_head = animation.anim_head;
		    shaderParams.rootBone = animation.root;
		    //for test
		    //shaderParams.skrootTrans = [0, 0, 0];
		    //shaderParams.mat_view = FaceUnity.CreateViewMatrix(globalRotationQuat, globalTranslation);
		    //shaderParams.mat_proj = FaceUnity.CreateProjectionMatrix_FOV(20, 0.1);
		} else {
		    shaderUse = s_vert_shader;
		}
		if (this.translate != null && this.translate != undefined &&
            this.rotate != null && this.rotate != undefined &&
            this.transform != null && this.transform != undefined) {
		    shaderParams.trans_pos = this.translate;
		    shaderParams.rot_mat1 = [this.rotate[0], this.rotate[1], this.rotate[2]];
		    shaderParams.rot_mat2 = [this.rotate[3], this.rotate[4], this.rotate[5]];
		    shaderParams.rot_mat3 = [this.rotate[6], this.rotate[7], this.rotate[8]];
		    shaderParams.model_mat = this.transform;
		} else {
		    shaderParams.rot_mat1 = [1, 0, 0];
		    shaderParams.rot_mat2 = [0, 1, 0];
		    shaderParams.rot_mat3 = [0, 0, 1];
		    shaderParams.trans_pos = [0, 0, 0];
		    shaderParams.model_mat = [1, 0, 0, 0,
                                      0, 1, 0, 0,
                                      0, 0, 1, 0,
                                      0, 0, 0, 1];
		}
		FaceUnity.RenderBlendshapeComponent_new(blendshape, this, shaderUse, shader, shaderParams, pass);
	}

	//meshgroup
	var MeshGroup = function (filename) {
	    this.meshName = filename;
	    this.blendshape = FaceUnity.LoadBlendshape(filename + ".json", filename + ".bin");
	    this.meshlst = new Array();
	    this.last_state = 0;
	    this.facehack_mesh_ref_lst = null;
	    this.transparent_mesh_ref_lst = null;
	    this.opaque_mesh_ref_lst = null;
	    this.AnimCounter = AnimCounter;

	    this.ReloadThingsForEditor();
	    this.pushBlendshape2Meshlst();
	    this.reExtractSubLst();
	}
	MeshGroup.prototype.setDCHash = function () {
	    this.blendshape.drawcalls.forEach(function (dc) {
	        dc.shader_hash_0 = undefined;
	        dc.shader_hash_1 = undefined;
	        dc.shader_hash_2 = undefined;
	    });
	}
	MeshGroup.prototype.ReloadThingsForEditor = function () {
	    //因为用户可能什么参数都没设……obj导出的贴图也还是load一下吧
	    this.blendshape.drawcalls.forEach(function (dc) {
	        if (dc.mat.tex && !tex_map[dc.mat.tex]) {
	            tex_map[dc.mat.tex] = FaceUnity.LoadTexture(dc.mat.tex);
	        }
	    });
	    //对每个物体
	    for (var sname in materials_json) {
	        //看一下是不是改过材质
	        var mat = materials_json[sname];
	        if (typeof (mat) == 'object') {
	            //然后在材质参数里面找tex_开头看着像贴图的
	            for (var skey in mat) {
	                if (skey.match(/^tex_.*/)) {
	                    //如果没有load过，就不管三七二十一load一下再说
	                    var fn = mat[skey];
	                    if (!tex_map[fn]) {
	                        tex_map[fn] = FaceUnity.LoadTexture(fn);
	                    }
	                }
	            }
	        }
	    }
	}
	MeshGroup.prototype.reExtractSubLst = function () {
		console.log("reExtractSubLst");
	    this.facehack_mesh_ref_lst = this.meshlst.filter(function (mesh) { return V((materials_json[mesh.name] || {}).obj_type, 0) <= 0.25; });
	    this.transparent_mesh_ref_lst = this.meshlst.filter(function (mesh) { return V((materials_json[mesh.name] || {}).is_hair, 0) > 0.5; });
	    this.opaque_mesh_ref_lst = this.meshlst.filter(function (mesh) {
	        return (V((materials_json[mesh.name] || {}).obj_type, 0) > 0.25)
				&& (V((materials_json[mesh.name] || {}).is_hair, 0) < 0.5);
	    });
	}
	MeshGroup.prototype.calTriggerNextNodesRef = function (meshlst_2d) {
	    for (var i = 0; i < this.meshlst.length; i++) {
	        var nmesh = this.meshlst[i];
	        if (nmesh.triggerNextNodes.length != 0) nmesh.triggerNextNodesRef = new Array();
	        for (var j = 0; j < nmesh.triggerNextNodes.length; j++) {
	            var mesh3dref = this.meshlst[nmesh.triggerNextNodes[j]];
	            if (mesh3dref) { nmesh.triggerNextNodesRef.push(mesh3dref); }
	            else if (meshlst_2d) {
	                var mesh2dref = meshlst_2d[nmesh.triggerNextNodes[j]];
	                if (mesh2dref) { nmesh.triggerNextNodesRef.push(mesh2dref); }
	            }
	        }
	    }
	}
	MeshGroup.prototype.pushBlendshape2Meshlst = function () {
		console.log("pushBlendshape2Meshlst");
	    for (var i = 0; i < this.blendshape.drawcalls.length; i++) {
	        var nmesh = new Mesh(this.blendshape.drawcalls[i], null);
	        if (materials_json[this.blendshape.drawcalls[i].name] != null &&
                materials_json[this.blendshape.drawcalls[i].name] != undefined)
	            nmesh = new Mesh(this.blendshape.drawcalls[i], materials_json[this.blendshape.drawcalls[i].name].anim);
	        this.meshlst.push(nmesh);
	        this.meshlst[nmesh.name] = nmesh;
	        if (nmesh.isactiveonce) this.AnimCounter.total++;
	    }
	}
	MeshGroup.prototype.renderMesh = function (params, pass, animation, fid) {
	    try {
	        //for tex animation
	        var now = Date.now();
	        if (this.last_state == 0) {
	            for (var i = 0; i < this.meshlst.length; i++) this.meshlst[i].switchState(this.last_state, 1);
	            this.last_state = 1;
	        }
			var alphaThreshold = parseFloat(V(globals.alphaThreshold, "1.0"));
			var m_texid_raw_input_is_rgba = FaceUnity.m_texid_raw_input_is_rgba;
			var shader;
			if(m_texid_raw_input_is_rgba==0){
				shader = s_frag_shader + "vec4 shader_main_OIT(){vec4 c=shader_main();return vec4(c.bgr,1.0);}";
			}
	        else{
				shader = s_frag_shader + "vec4 shader_main_OIT(){vec4 c=shader_main();return vec4(c.rgb,1.0);}";
			}
	        var parent = this;
	        //update for all mesh
	        this.meshlst.forEach(function (mesh) {
	            mesh.triggerStartEvent(params, now, false);
	            mesh.updateEvent(params, now);
	        });
	        if (pass == 1) {
				/*
				if(this.meshName=="avatar" && g_avatar_data!=undefined){
					FaceUnity.ComputeBlendshapeGeometry(this.blendshape, params,46,0,1);
				}else{
					FaceUnity.ComputeBlendshapeGeometry(this.blendshape, params);
				}
				*/
				FaceUnity.ComputeBlendshapeGeometry(this.blendshape, params);
	            //for facehack
	            gl.enable(gl.DEPTH_TEST);
	            gl.depthFunc(gl.LEQUAL);
	            gl.enable(gl.BLEND);
	            gl.blendFunc(gl.ZERO, gl.ONE);
	            this.facehack_mesh_ref_lst.forEach(function (mesh) { mesh.renderEvent(parent.blendshape, params, -1, shader, animation, fid); });
	            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

	        } else if (pass == 2) {
	            //for opaque object
	            gl.enable(gl.DEPTH_TEST);
	            gl.depthFunc(gl.LEQUAL);
	            gl.depthMask(true);
	            gl.disable(gl.BLEND);
	            this.opaque_mesh_ref_lst.forEach(function (mesh) { 
					if(mesh.name == "teenth"){
						shader = s_frag_teeth_shader+"vec4 shader_main_OIT(){vec4 c=shader_main();return vec4(c.rgb,1.0);}";
					}
					mesh.renderEvent(parent.blendshape, params, 0, shader, animation, fid); });

	            //for transport object, alpha cut pass one
	            gl.enable(gl.DEPTH_TEST);
	            gl.depthMask(true);
	            shader = s_frag_shader + "vec4 shader_main_OIT(){vec4 c=shader_main();if (c.a>=" + alphaThreshold.toFixed(3) + ") return vec4(c.rgb,1.0);else discard;}";
	            this.transparent_mesh_ref_lst.forEach(function (mesh) { mesh.renderEvent(parent.blendshape, params, 1, shader, animation, fid); });

	            //for transport object, alpha cut pass two
	            gl.enable(gl.DEPTH_TEST);
	            gl.depthMask(false);
	            gl.enable(gl.BLEND);
	            gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ZERO);
	            shader = s_frag_shader + "vec4 shader_main_OIT(){vec4 c=shader_main();if (c.a<=" + alphaThreshold.toFixed(3) + ") return vec4(c.rgb,c.a*" + (1.0 / alphaThreshold).toFixed(3) + ");else return vec4(c.rgb,0.0);}";
	            this.transparent_mesh_ref_lst.forEach(function (mesh) { mesh.renderEvent(parent.blendshape, params, 2, shader, animation, fid); });

	            gl.depthMask(true);
	            gl.disable(gl.DEPTH_TEST);

	            this.meshlst.forEach(function (mesh) { mesh.triggerEndEvent(params, now, false, parent.AnimCounter); });
	        }
	        FaceUnity.SimpleOITEnd();
	    } catch (err) {
	        console.log(err.stack)
	    }
	}

    //animation & mesh
	var AnimationMeshPair = function (meshFilename) {
	    this.meshName = meshFilename;
	    this.meshgroup = new MeshGroup(meshFilename);
	    this.animation = null;

	    this.initMeshAnimation = function () {
	        if (this.animation != null) {
	            this.animation.reset_anim_process(this.animation.anim_state);
	            this.animation.animating = 1;
	            this.animation.play_count = 0;
	        }
	    }
	    this.calculate_anim_fid = function (frame_id) {
	        return this.animation.animating ? this.animation.frame_id_callback(this.animation, frame_id) : 0;
	    }
	    this.update_animation = function(params) {
	        if (this.animation.animating) this.animation.update_callback(this.animation, params);
	    }
	    this.DoRender = function (params, pass) {
	        if (this.animation != null) {
	            var frame_id = 0;
	            if (frame_id == params.frame_id) return;
	            frame_id = params.frame_id;
	            var fid = 0;
	            this.update_animation(params);
	            this.meshgroup.renderMesh(params, pass, this.animation, fid);
	        } else
	            this.meshgroup.renderMesh(params, pass, null, 0);
	    }
	}

	var AnimMeshs = { "avatar": new AnimationMeshPair("avatar") };
	AnimMeshs["avatar_teenth"] = new AnimationMeshPair("avatar_teenth");
	var fMeshs = fbxmeshs.meshes;
	for (var i = 0; i < fMeshs.length; i++) {
	    var meshName = fMeshs[i];
	    AnimMeshs[meshName] = new AnimationMeshPair(meshName);
	}

	var animations = require("anim_dq_script.js");
	var animlist = animations.Anims;
	
    //animations trigger
	var UpdateAnimation = function (anim, params, noface) {
	    if (anim != undefined && anim != null && "meshName" in anim) {
	        var istriggerd = false;
	        if (anim.triggerstart == "alwaysrender" && !anim.betriggered) {
	            var pair = AnimMeshs[anim.meshName];
	            if (pair.animation != anim) {
	                istriggerd = true;
	                anim.bind(pair);
	            }
	        } else if (((anim.triggerstart == "faceaction" && isActionTriggered(anim.startaction, params)) ||
                    (anim.triggerstart == "newface")) && !noface &&
                    (!anim.betriggered || anim.startaction == "null")) {
	            var pair = AnimMeshs[anim.meshName];
	            if (pair.animation != anim) {
	                istriggerd = true;
	                anim.bind(pair);
	            }
	        } else if (anim.triggerend == "faceaction" && isActionTriggered(anim.endaction, params)) {
	            var pair = AnimMeshs[anim.meshName];
	            if (pair.animation == anim) {
	                istriggerd = true;
	                anim.unbind(pair);
	                TriggerNext(anim);
	            }
	        }
	        if (anim.startaction != "null" && anim.needkeepfaceaction == 1 && !isActionTriggered(anim.startaction, params)) {
	            var pair = AnimMeshs[anim.meshName];
	            if (pair.animation == anim) {
	                istriggerd = true;
	                anim.unbind(pair);
	                TriggerNext(anim);
	            }
	        }
	        if (anim.looptype == "loopcnt" && anim.play_count >= anim.loopcnt) {
	            var pair = AnimMeshs[anim.meshName];
	            if (pair.animation == anim) {
	                istriggerd = true;
	                anim.unbind(pair);
	                TriggerNext(anim);
	            }
	        } else if (anim.looptype == "loop1stay" && anim.play_count >= 1) {
	            var pair = AnimMeshs[anim.meshName];
	            if (pair.animation == anim) {
	                istriggerd = true;
	                anim.unbind(pair);
	                TriggerNext(anim);
	            }
	        }
	        if (anim.isactiveonce == 1 && anim.play_count >= 1) {
	            var pair = AnimMeshs[anim.meshName];
	            if (pair.animation == anim) {
	                istriggerd = true;
	                anim.unbind(pair);
	                TriggerNext(anim);
	            }
	        }
	        if (istriggerd) {
	            var pair = AnimMeshs[anim.meshName];
	            var meshgrp = pair.meshgroup;
	            var meshlst = meshgrp.meshlst;
	            for (var i = 0; i < meshlst.length; i++) {
	                var mesh = meshlst[i];
	                for (var j = 0; j < 4; j++) {
	                    mesh["shader_hash_" + j] = undefined;
	                }
	            }
	        }
	    }
	}

	var TriggerNext = function (anim) {
	    if (anim != null && anim != undefined) {
	        var triggerList = anim.triggerNextNodes;
	        if (triggerList.length <= 0) return;
	        for (var i = 0; i < triggerList.length; i++) {
	            var nextName = triggerList[i];
	            var animNext = animlist[nextName];
	            if (animNext != null && animNext != undefined) {
	                var pair = AnimMeshs[animNext.meshName];
	                if (pair.animation != animNext) {
	                    animNext.bind(pair);
	                }
	            }
	        }
	    }
	}
	//AnimMeshs["avatar"].meshgroup.calTriggerNextNodesRef(undefined);
	
	
	var updateTransMat = function(params){
		//console.log("update updateTransMat");
		last_focallength = params.focal_length;
		//console.log("last_focallength:",last_focallength);
		var w = params.w;
		var h = params.h; 
		//var w = g_picasso_width;
		//var h = g_picasso_height;
		if(g_params.isAndroid>0.5){
			console.log("updateTransMat isAndroid");
			w = params.h;
			h = params.w;
		}
		//console.log("w:",w,"h:",h);
		post_trs_z = 5000;
		var imageratio = g_picasso_height / g_picasso_width;
		//console.log(" g_picasso_height:",g_picasso_height, "g_picasso_width:",g_picasso_width);
		//console.log("p2a_vertical_fov:",p2a_vertical_fov);
		//var scalez = post_trs_z / last_focallength;
		console.log("imageratio:",imageratio);
		var screen_trs_w = 2*(1.0 / imageratio)*Math.tan(p2a_vertical_fov/360.0 * Math.PI) * 5000;
		var screen_trs_h = 2*Math.tan(p2a_vertical_fov/360.0 * Math.PI) * 5000;
		//if android
		var screen_ratio = h / w;
		var bbx = AnimMeshs["avatar"].meshgroup.blendshape.boundingbox;
		pre_trs_x = -(bbx[3]+bbx[0])/2.0;
		pre_trs_y = -(bbx[4]+bbx[1])/2.0;
		var img_w = (bbx[3]-bbx[0]);
		var img_h = (bbx[4]-bbx[1]);
		var img_ratio = img_h / img_w;
		pre_scale = 1;
		console.log("screen_trs_h:",screen_trs_h,"img_h:",img_h);
		console.log("screen_trs_w:",screen_trs_w,"img_w:",img_w);
		if(img_ratio > screen_ratio){
			console.log("img_ratio > screen_ratio");
			pre_scale = screen_trs_w / img_w;
		}else{
			console.log("img_ratio < screen_ratio");
			pre_scale = screen_trs_h / img_h;
		}
		console.log("pre_scale:",pre_scale);
		// shader do [pre_trs_x,pre_trs_y] then pre_scale then post_trs_z
		isReady = 1;
	}
	///////warning convension
	
	var g_imagedata = undefined;
	var g_tex_image = undefined;
	var g_picasso_width = 0;
	var g_picasso_height = 0;
	
	//
	var g_avatar_data = undefined;
	var g_avatar_json = undefined;
	var g_weight_data = undefined;
	var tex_weight = undefined;
	var g_weight_w = 0, g_height_h = 0;
	//
	var g_picasso_fit_expression = undefined;
	var g_teeth_tm = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
	var g_gened_picassodata = undefined;
	var g_picasso_data_ready = false;
	var dde_focal_length = undefined;
	var p2a_vertical_fov = undefined;
	var nama_minw_fov = undefined;
	var expr_interplate = 500;
	var expr_interplate_cur = 0;
	
	//local init picasso
	g_avatar_json = JSON.parse(FaceUnity.ReadFromCurrentItem("picasso_avatar.json")||"{}");
	tex_map["picasso.webp"] = FaceUnity.LoadTexture("picasso_img.webp",0);
	g_picasso_height = tex_map["picasso.webp"].h;
	g_picasso_width = tex_map["picasso.webp"].w;
	var jobj = g_avatar_json;
	g_picasso_fit_expression = jobj.expression.slice();
	g_avatar_data = FaceUnity.LoadBlendshape("picasso_avatar.json","picasso_avatar.bin");
	g_teeth_tm = jobj["teeth_trans"].slice();
	console.log("g_teeth_tm",g_teeth_tm);
	var eyeleftid = jobj["eyes_id"][0];
	var eyerightid = jobj["eyes_id"][1];
	var left_ltrb_id = jobj["eyes_edge_id"].slice(0,4);
	var right_ltrb_id = jobj["eyes_edge_id"].slice(4);
	console.log("eyeleftid",eyeleftid,"eyerightid",eyerightid);
	console.log("right_ltrb_id",right_ltrb_id);
	console.log("left_ltrb_id",left_ltrb_id);
	dde_focal_length = 6000;//jobj["focal_length"];
	p2a_vertical_fov = jobj["fov"];
	console.log("dde_focal_length:",dde_focal_length);
	console.log("p2a_vertical_fov:",p2a_vertical_fov);
	nama_minw_fov = undefined;
	g_avatar_data.drawcalls[0]["eyeinfo"] = {eyeleftvid:eyeleftid,eyerightvid:eyerightid,left_ltrb_id:left_ltrb_id,right_ltrb_id:right_ltrb_id};
	
	AnimMeshs["avatar"].meshgroup.blendshape = g_avatar_data;
	AnimMeshs["avatar"].meshgroup.meshName = "avatar";
	AnimMeshs["avatar"].meshgroup.meshlst = new Array();
	AnimMeshs["avatar"].meshgroup.last_state = 0;
	AnimMeshs["avatar"].meshgroup.facehack_mesh_ref_lst = null;
	AnimMeshs["avatar"].meshgroup.transparent_mesh_ref_lst = null;
	AnimMeshs["avatar"].meshgroup.opaque_mesh_ref_lst = null;
	AnimMeshs["avatar"].meshgroup.AnimCounter = AnimCounter;
	AnimMeshs["avatar"].meshgroup.pushBlendshape2Meshlst();
	AnimMeshs["avatar"].meshgroup.reExtractSubLst();
	
	
	last_focallength=0;
	var isInitNamaFov = 0;
	var nama_minw_fov_1 = undefined;
	var nama_minw_fov_2 = undefined;
	
	//ex 16,
	var swaplst = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,  17,18,  20,22,  23,24,  25,26,  27,28,  29,30,  31,32,  44,45];
	
	//moving avg for eye rot
	var sumeyerot = 0.0;
	var rotlst = [0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0];
	var avgcnt=5;
	var idx = 0;
	
	return {
	    CalRef:AnimMeshs["avatar"].meshgroup.calTriggerNextNodesRef,
	    meshlst: AnimMeshs["avatar"].meshgroup.meshlst,
		animCounter: AnimCounter,
		//接下来就是道具对象的内容了
		/// \brief 处理编辑器发起的参数修改
		SetParam:function(name,value){
			//特殊参数名'@refresh'表示“刷新一下”
			try{
				if(name=='@refresh'){
					ReloadThingsForEditor();
					for (var prop in AnimMeshs)
						AnimMeshs[prop].meshgroup.ReloadThingsForEditor();
					return 1;
				}
				if(name=='isAndroid'){
					g_params[name] = value;
					return 1;
				}
				if(name=='is3DFlipH'){
					g_params[name] = value;
					return 1;
				}
				if(name=='isFlipExpr'){
					g_params[name] = value;
					return 1;
				}
				if(name=="weightOffset"){
					g_params[name]=value;
					return 1;
				}
				if(name=="picasso_image"){
					console.log("picasso_image js call");
					var buffer = new ArrayBuffer(value.length);
					var u8view = new Uint8Array(buffer);
					for(var i = 0;i<value.length;i++){
						u8view[i] = value[i];
					}
					var i32view = new Int32Array(buffer);
					g_picasso_width = i32view[0];
					g_picasso_height = i32view[1];
					if(g_picasso_width<=0 || g_picasso_height<=0){
						console.log("data error:","width:", g_picasso_width," height:",g_picasso_height);
						console.log("picasso_image [0-7]bytes is width&height,[8-n]is image rgba data");
						return 0;
					}
					var totlength = g_picasso_width*g_picasso_height;
					console.log("width:", g_picasso_width," height:",g_picasso_height," total byte:",u8view.length,"total int:",i32view.length);
					
					g_imagedata = [];
					for(var i = 0;i<g_picasso_width*g_picasso_height;i++){
						g_imagedata[i] = i32view[2+i];
					}
					console.log("g_imagedata length:",g_imagedata.length);
					tex_image = FaceUnity.LoadTextureRT(g_imagedata,g_picasso_width,g_picasso_height);
					tex_map["picasso.webp"] = tex_image;
					console.log(tex_image.w);
				}
				if(name == "genpicasso"){
					console.log("genpicasso");
					if(g_imagedata==undefined){
						console.log("picasso_image is null,please, set image first");
						return 0;
					}
					g_gened_picassodata = FaceUnity.GenEmbossRT(g_imagedata,g_picasso_width,g_picasso_height,1,1);
					console.log("g_gened_picassodata retvalue length:",g_gened_picassodata.length);
					this.SetParam("load_picasso_data",value);
					return 1;
				}
				if(name == "picasso_data"){
					console.log("picasso_data call");
					if(g_imagedata==undefined){
						console.log("picasso_image is null,please, set image first");
						return 0;
					}
					g_gened_picassodata = value;
					console.log("g_gened_picassodata retvalue length:",g_gened_picassodata.length);
					this.SetParam("load_picasso_data",1);
					return 1;
				}
				if(name=="load_picasso_data"){
					if(g_gened_picassodata==undefined){
						console.log("g_gened_picassodata==undefined","call genpicasso first");
						return 0;
					}
					console.log("load_picasso_data size",g_gened_picassodata.length);
					
					var buffer = new ArrayBuffer(g_gened_picassodata.length);
					var u8view = new Uint8Array(buffer);
					if(g_gened_picassodata.length<4){
						console.log("g_gened_picassodata is broken.")
						return 0;
					}
					
					for(var i = 0;i<g_gened_picassodata.length;i++){
						u8view[i] = g_gened_picassodata[i];
					}
					
					var i32view = new Int32Array(buffer,0,1);
					
					var jsonoffset = i32view[0];//avatar.bin size
					console.log("jsonoffset:",jsonoffset);
					var avatarbuf = new ArrayBuffer(jsonoffset);
					var u8view_avatarbuf = new Uint8Array(avatarbuf);
					for(var i = 0;i<jsonoffset;i++){
						u8view_avatarbuf[i] = u8view[i+4];
					}
					
					var jsonsize = g_gened_picassodata.length-jsonoffset;
					console.log("jsonsize",jsonsize);
					var jsonbuf = new ArrayBuffer(jsonsize);
					var u8view_jsonbuf = new Uint8Array(jsonbuf);
					for(var i = 0;i<jsonsize-1;i++){
						u8view_jsonbuf[i] = u8view[i+jsonoffset+4];
					}
					for(var i = 0;i<4;i++){
						if(u8view_jsonbuf[jsonsize-i-1]=="\0".charCodeAt(0))u8view_jsonbuf[jsonsize-i-1] = "\n".charCodeAt(0);
					}
					//u8view_jsonbuf[jsonsize-1] = "x".charCodeAt(0);;
					var jsonb = new Buffer(u8view_jsonbuf);
					console.log(jsonb);
					g_avatar_json = JSON.parse(jsonb);
					
					
					//console.log("jsonb",jsonb);
					var avatarb = new Buffer(u8view_avatarbuf);
					console.log("avatar size:",u8view_avatarbuf.length);
					console.log("jsonb size:",jsonb.length);
					var jobj = JSON.parse(jsonb);
					g_picasso_fit_expression = jobj.expression.slice();
					console.log(g_picasso_fit_expression);
					//console.log(jobj.ofs_ebo);
					
					g_avatar_data = FaceUnity.LoadBlendshapeRT(jsonb,avatarb);
					
					console.log("----------------------------");
					g_teeth_tm = jobj["teeth_trans"].slice();
					console.log("g_teeth_tm",g_teeth_tm);
					var eyeleftid = jobj["eyes_id"][0];
					var eyerightid = jobj["eyes_id"][1];
					var left_ltrb_id = jobj["eyes_edge_id"].slice(0,4);
					var right_ltrb_id = jobj["eyes_edge_id"].slice(4);
					console.log("eyeleftid",eyeleftid,"eyerightid",eyerightid);
					console.log("right_ltrb_id",right_ltrb_id);
					console.log("left_ltrb_id",left_ltrb_id);
					dde_focal_length = 6000;//jobj["focal_length"];
					p2a_vertical_fov = jobj["fov"];
					console.log("dde_focal_length:",dde_focal_length);
					console.log("p2a_vertical_fov:",p2a_vertical_fov);
					nama_minw_fov = undefined;
					
					g_avatar_data.drawcalls[0]["eyeinfo"] = {eyeleftvid:eyeleftid,eyerightvid:eyerightid,left_ltrb_id:left_ltrb_id,right_ltrb_id:right_ltrb_id};
					
					AnimMeshs["avatar"].meshgroup.blendshape = g_avatar_data;
					AnimMeshs["avatar"].meshgroup.meshName = "avatar";
					AnimMeshs["avatar"].meshgroup.meshlst = new Array();
					AnimMeshs["avatar"].meshgroup.last_state = 0;
					AnimMeshs["avatar"].meshgroup.facehack_mesh_ref_lst = null;
					AnimMeshs["avatar"].meshgroup.transparent_mesh_ref_lst = null;
					AnimMeshs["avatar"].meshgroup.opaque_mesh_ref_lst = null;
					AnimMeshs["avatar"].meshgroup.AnimCounter = AnimCounter;
					AnimMeshs["avatar"].meshgroup.pushBlendshape2Meshlst();
					AnimMeshs["avatar"].meshgroup.reExtractSubLst();
					last_focallength=0;
					console.log("load picasso data end");
				}
			}catch(err){
				console.log(err.stack);
			}
			
			/*
			否则的话，name里面就是一个JSON对象：{"name":"材质名或<global>"，"param":"参数名"}
			接着就是根据不同情况找到参数的位置设上值。考虑到每个部分都可能写错，处理一下异常会安全一些。
			有特殊需求的话，可以在这里进行一定的合法性检查。
			*/
			try{
				var desc;
				try{
					desc=JSON.parse(name);
				}catch(err){return undefined;}
				if(desc.thing=="<global>"){
					globals[desc.param]=value;
					if (desc.param == "alphaThreshold") {
					    for (var prop in AnimMeshs)
					        AnimMeshs[prop].meshgroup.setDCHash();
					}
					return 1;
				}else{
					var dc=materials_json[desc.thing];
					if(!dc){
						console.log("3d mesh not found");
						return undefined;
					}
					dc[desc.param]=value;
					if (desc.param == "obj_type" || desc.param == "is_hair") {
					    for (var prop in AnimMeshs)
					        AnimMeshs[prop].meshgroup.reExtractSubLst();
					}
					return 1;
				}
			}catch(err){console.log(err.stack);}
			return undefined;
		},
		/// \brief 给编辑器提供用来在界面上显示的参数值，或者将需要保存的东西返回给编辑器
		GetParam:function(name){
			//前面两个是保存用的
		    if (name == "hasFinish") return AnimCounter.hasFinish();
		    if (name == "allFinish") return AnimCounter.allFinish();
			if(name=='@global_json'){
				return JSON.stringify(globals,null,2);
			}
			if(name=='@materials_json'){
				return JSON.stringify(materials_json,null,2);
			}
			if(name=="picasso_data"){
				if(g_gened_picassodata==undefined){
					console.log("g_gened_picassodata==undefined","please call genpicasso first");
					return 0;
				}
				var buffer = new ArrayBuffer(g_gened_picassodata.length);
				var u8view = new Uint8Array(buffer);
				for(var i = 0;i<value.length;i++){
					u8view[i] = g_gened_picassodata[i];
				}
				var ret = [];
				for(var i = 0;i<u8view.length;i++){
					ret = g_gened_picassodata[i];
				}
				return g_gened_picassodata;
			};
			/*
			编辑器本身并不会记忆修改的参数值，而是每次都会过来取。
			如果编辑器上什么东西怎么拽都不动弹的话，那么多半就是这个文件里什么地方写错了。
			*/
			try{
				var desc=JSON.parse(name);
				if(desc.thing=="<global>"){
					return globals[desc.param];
				}else{
					var dc=materials_json[desc.thing];
					if(dc){
						return dc[desc.param];
					}
				}
			}catch(err){console.log(err.stack);}
			return undefined;
		},
		/// \brief 主要的绘制逻辑
		Render: function (params, pass) {
			var rot = params.rotation.slice();
			var expr = params.expression.slice();
			var pupilpos = params.pupil_pos.slice();
			
			params.pupil_pos[0] *= V(globals.eyeRscale,1.0);
			params.pupil_pos[1] *= V(globals.eyeRscale,1.0);
			params.pupil_pos[0] *= 10.0;
			
			sumeyerot -= rotlst[idx];
			rotlst[idx] = params.pupil_pos[0];
			sumeyerot += rotlst[idx];
			idx = (idx+1)%avgcnt;
			params.pupil_pos[0] = sumeyerot/avgcnt;
			
			params.expression[6] = params.expression[11] = -params.pupil_pos[0];//inner
			params.expression[10] = params.expression[7] = params.pupil_pos[0];//outer
			params.expression[12] = params.expression[13] = params.pupil_pos[1];//up
			params.expression[4] = params.expression[5] = -params.pupil_pos[1];//down
			
			if(g_params.isFlipExpr>0.5){
				//filp rotation 
				var rotation = params.rotation.slice();
				//rotation[0] = -rotation[0];
				rotation[1] = -rotation[1];
				rotation[2] = -rotation[2];
				params.rotation = rotation;
				
				//filp exp
				for (var i = 0;i<swaplst.length;i+=2){
					var tmp = params.expression[swaplst[i]];
					params.expression[swaplst[i]] = params.expression[swaplst[i+1]];
					params.expression[swaplst[i+1]] = tmp;
				}
				// fack eye rot
				params.pupil_pos[0] = -params.pupil_pos[0];
			}
			if(V(globals.is_fix_x,0)>0.5){
				params.translation[0] = V(globals.fixed_x,0);
			}
			if(V(globals.is_fix_y,0)>0.5){
				params.translation[1] = V(globals.fixed_y,0);
			}
			if(V(globals.is_fix_z,0)>0.5){
				params.translation[2] = V(globals.fixed_z,0);
			}
			if (!params.focal_length) params.focal_length = focal_length;
			
			
			if(V(globals.expr_clamp,0)>0.5){
				for(var i =0;i<46;i++){
					params.expression[i] = Math.max(Math.min(params.expression[i],1.0),0.0);
				}
			}
			if(isInitNamaFov<0.5){
				if(p2a_vertical_fov){
					var h = params.h;
					var w = params.w;
					var screenaspect = h / w;
					var radVFOV = 2 * Math.atan(Math.tan(p2a_vertical_fov / 360.0 * 3.1415) / screenaspect);
					var vradFOV = 180.0 * radVFOV / 3.1415;
					nama_minw_fov_1 = vradFOV;
					//for android
					h = params.w;
					w = params.h;
					screenaspect = h / w;
					radVFOV = 2 * Math.atan(Math.tan(p2a_vertical_fov / 360.0 * 3.1415) / screenaspect);
					vradFOV = 180.0 * radVFOV / 3.1415;
					nama_minw_fov_2 = vradFOV;
					console.log("nama_minw_fov_1:",nama_minw_fov_1,"nama_minw_fov_2:",nama_minw_fov_2);
				}
				isInitNamaFov = 1.0;
			}
			if(g_params.isAndroid>0.5){
				nama_minw_fov = nama_minw_fov_2;
			}else{
				nama_minw_fov = nama_minw_fov_1;
			}
			
			//console.log("params.pupil_pos:",params.pupil_pos);
			if(dde_focal_length)params.focal_length = dde_focal_length;
			if(params.focal_length && (params.focal_length - last_focallength)>0.0001){
				updateTransMat(params);
			}
			if(isReady){
				params.pre_trs_x = pre_trs_x;
				params.pre_trs_y = pre_trs_y;
				params.pre_scale = pre_scale;
				params.post_trs_z = post_trs_z;
				params.isReady = 1;
			}else{
				params.isReady = 0;
			}
			//g_avatar_data.drawcalls[0]["eyeinfo"] = {"eyeleftvid":eyeleftid,"eyerightvid":eyerightid,};
			//animation trigger
			for (var prop in animlist) {
			    UpdateAnimation(animlist[prop], params, false);
			}
			//3d item trigger & DoRender
			for (var prop in AnimMeshs) {
			    AnimMeshs[prop].DoRender(params, pass);
			}
			params.rotation = rot;
			params.expression = expr;
			params.pupil_pos = pupilpos;
		},
		RenderNonFace: function (params, pass) {  
		    ////fixed section
		    if (params.face_count > 0) return;
			var isNoFace = V(globals.isnofacerender, 0) > 0.5;
			if(isInitNamaFov<0.5){
				if(p2a_vertical_fov){
					var h = params.h;
					var w = params.w;
					var screenaspect = h / w;
					var radVFOV = 2 * Math.atan(Math.tan(p2a_vertical_fov / 360.0 * 3.1415) / screenaspect);
					var vradFOV = 180.0 * radVFOV / 3.1415;
					nama_minw_fov_1 = vradFOV;
					//for android
					h = params.w;
					w = params.h;
					screenaspect = h / w;
					radVFOV = 2 * Math.atan(Math.tan(p2a_vertical_fov / 360.0 * 3.1415) / screenaspect);
					vradFOV = 180.0 * radVFOV / 3.1415;
					nama_minw_fov_2 = vradFOV;
					console.log("nama_minw_fov_1:",nama_minw_fov_1,"nama_minw_fov_2:",nama_minw_fov_2);
				}
				isInitNamaFov = 1.0;
			}
			if(g_params.isAndroid>0.5){
				nama_minw_fov = nama_minw_fov_2;
			}else{
				nama_minw_fov = nama_minw_fov_1;
			}
			
		    if (isNoFace) {
		        for (var ap in animlist) 
		            UpdateAnimation(animlist[ap], params, true);
		    }
		    for (var prop in AnimMeshs) {
		        var meshgrp = AnimMeshs[prop].meshgroup;
		        if (meshgrp.last_state == 1 && !params.face_count) {
		            for (var i = 0; i < meshgrp.meshlst.length; i++) meshgrp.meshlst[i].switchState(meshgrp.last_state, 0);
		            meshgrp.last_state = 0;
		        }
		        try {
		            if (isNoFace) {
		                params.translation = [V(globals.fixed_nx, 0), V(globals.fixed_ny, 0), V(globals.fixed_nz, 350), 1];
		                params.rotation = [0, 0, 0, 1];
		                params.pupil_pos = [0, 0];
						
						/*if(g_picasso_fit_expression!=undefined){
							if(expr_interplate_cur>expr_interplate){expr_interplate_cur = 0;}
							var t = expr_interplate_cur / parseFloat(expr_interplate);
							var expr = expression.slice();
							for(var i = 0;i<46;i++){
								expr[i] = t*expression[i] + (1-t)*g_picasso_fit_expression[i];
							}
							params.expression = expr;
							expr_interplate_cur++;
						}else{
							params.expression = expression;
						}*/
						params.expression = expression;
		                if (!params.focal_length) params.focal_length = focal_length;
						if(dde_focal_length)params.focal_length = dde_focal_length;
						if(params.focal_length && (params.focal_length - last_focallength)>0.0001){
							updateTransMat(params);
						}
						if(isReady){
							params.pre_trs_x = pre_trs_x;
							params.pre_trs_y = pre_trs_y;
							params.pre_scale = pre_scale;
							params.post_trs_z = post_trs_z;
							params.isReady = 1;
						}else{
							params.isReady = 0;
						}
		                AnimMeshs[prop].DoRender(params, pass);
		            }
		        } catch (err) {
		            console.log(err.stack);
		        }
		    }
		},
		name:V(globals.name,"unnamed"),
	};
})()