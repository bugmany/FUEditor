
 X
data
conv2_1/exp_w
conv2_1/exp_bconv2_1/exp"Conv*

stride*
pad *

kernel 
conv2_1/expconv2_1/exp"Relug
conv2_1/exp
conv2_1/dw_w
conv2_1/dw_b
conv2_1/dw"Conv*

stride*
pad*

kernel*	
group 

conv2_1/dw
conv2_1/dw"Relug

conv2_1/dw
conv2_1/linear_w
conv2_1/linear_bconv2_1/linear"Conv*

stride*
pad *

kernelb
conv2_1/linear
conv2_2/exp_w
conv2_2/exp_bconv2_2/exp"Conv*

stride*
pad *

kernel 
conv2_2/expconv2_2/exp"Relug
conv2_2/exp
conv2_2/dw_w
conv2_2/dw_b
conv2_2/dw"Conv*

stride*
pad*

kernel*	
group0

conv2_2/dw
conv2_2/dw"Relug

conv2_2/dw
conv2_2/linear_w
conv2_2/linear_bconv2_2/linear"Conv*

stride*
pad *

kernel/
conv2_1/linear
conv2_2/linearblock2_2"Sum\
block2_2
conv3_1/exp_w
conv3_1/exp_bconv3_1/exp"Conv*

stride*
pad *

kernel 
conv3_1/expconv3_1/exp"Relug
conv3_1/exp
conv3_1/dw_w
conv3_1/dw_b
conv3_1/dw"Conv*

stride*
pad*

kernel*	
group0

conv3_1/dw
conv3_1/dw"Relug

conv3_1/dw
conv3_1/linear_w
conv3_1/linear_bconv3_1/linear"Conv*

stride*
pad *

kernelb
conv3_1/linear
conv3_2/exp_w
conv3_2/exp_bconv3_2/exp"Conv*

stride*
pad *

kernel 
conv3_2/expconv3_2/exp"Relug
conv3_2/exp
conv3_2/dw_w
conv3_2/dw_b
conv3_2/dw"Conv*

stride*
pad*

kernel*	
group@

conv3_2/dw
conv3_2/dw"Relug

conv3_2/dw
conv3_2/linear_w
conv3_2/linear_bconv3_2/linear"Conv*

stride*
pad *

kernel/
conv3_1/linear
conv3_2/linearblock3_2"Sum\
block3_2
conv3_3/exp_w
conv3_3/exp_bconv3_3/exp"Conv*

stride*
pad *

kernel 
conv3_3/expconv3_3/exp"Relug
conv3_3/exp
conv3_3/dw_w
conv3_3/dw_b
conv3_3/dw"Conv*

stride*
pad*

kernel*	
group@

conv3_3/dw
conv3_3/dw"Relug

conv3_3/dw
conv3_3/linear_w
conv3_3/linear_bconv3_3/linear"Conv*

stride*
pad *

kernel)
block3_2
conv3_3/linearblock3_3"Sume
block3_3
conv4_1_reduce_w
conv4_1_reduce_bconv4_1_reduce"Conv*

stride*
pad *

kernel&
conv4_1_reduceconv4_1_reduce"Relux
conv4_1_reduce
conv4_1_dw_w
conv4_1_dw_b
conv4_1_dw"Conv*

stride*
pad*

kernel*	
group *
dilation

conv4_1_dw
conv4_1_dw"Relug

conv4_1_dw
conv4_1_linear_w
conv4_1_linear_bconv4_1_linear"Conv*

stride*
pad *

kernel(
block3_3
conv4_1_linearconv4_1"Sum
conv4_1conv4_1"Relud
conv4_1
conv4_2_reduce_w
conv4_2_reduce_bconv4_2_reduce"Conv*

stride*
pad *

kernel&
conv4_2_reduceconv4_2_reduce"Relux
conv4_2_reduce
conv4_2_dw_w
conv4_2_dw_b
conv4_2_dw"Conv*

stride*
pad*

kernel*	
group *
dilation

conv4_2_dw
conv4_2_dw"Relug

conv4_2_dw
conv4_2_linear_w
conv4_2_linear_bconv4_2_linear"Conv*

stride*
pad *

kernel'
conv4_1
conv4_2_linearconv4_2"Sum
conv4_2conv4_2"Relud
conv4_2
conv4_3_reduce_w
conv4_3_reduce_bconv4_3_reduce"Conv*

stride*
pad *

kernel&
conv4_3_reduceconv4_3_reduce"Relux
conv4_3_reduce
conv4_3_dw_w
conv4_3_dw_b
conv4_3_dw"Conv*

stride*
pad*

kernel*	
group *
dilation

conv4_3_dw
conv4_3_dw"Relug

conv4_3_dw
conv4_3_linear_w
conv4_3_linear_bconv4_3_linear"Conv*

stride*
pad *

kernel'
conv4_2
conv4_3_linearconv4_3"Sum
conv4_3conv4_3"Relug
conv4_3conv5_1_pooling"AveragePool*

stride*
pad *

kernel*
order"NCHW*

legacy_padl
conv5_1_pooling
conv5_1_reduce_w
conv5_1_reduce_bconv5_1_reduce"Conv*

stride*
pad *

kernel&
conv5_1_reduceconv5_1_reduce"Reluj
conv5_1_reduce
conv5_1_dw_w
conv5_1_dw_b
conv5_1_dw"Conv*

stride*
pad*

kernel*	
group 

conv5_1_dw
conv5_1_dw"ReluA

conv5_1_dwconv5_1_interp"ResizeLinear*	
width *

height g
conv4_3conv5_2_pooling"AveragePool*

stride*
pad *

kernel*
order"NCHW*

legacy_padl
conv5_2_pooling
conv5_2_reduce_w
conv5_2_reduce_bconv5_2_reduce"Conv*

stride*
pad *

kernel&
conv5_2_reduceconv5_2_reduce"Reluj
conv5_2_reduce
conv5_2_dw_w
conv5_2_dw_b
conv5_2_dw"Conv*

stride*
pad*

kernel*	
group 

conv5_2_dw
conv5_2_dw"ReluA

conv5_2_dwconv5_2_interp"ResizeLinear*	
width *

height d
conv4_3
conv5_3_reduce_w
conv5_3_reduce_bconv5_3_reduce"Conv*

stride*
pad *

kernel&
conv5_3_reduceconv5_3_reduce"Reluj
conv5_3_reduce
conv5_3_dw_w
conv5_3_dw_b
conv5_3_dw"Conv*

stride*
pad*

kernel*	
group 

conv5_3_dw
conv5_3_dw"ReluA

conv5_3_dwconv5_3_interp"ResizeLinear*	
width *

height }
conv5_1_interp
conv5_2_interp
conv5_3_interp
block2_2conv5_concat_conv5_concat_dims"Concat*
order"NCHW*
axis`
conv5_concat
conv6_1/exp_w
conv6_1/exp_bconv6_1/exp"Conv*

stride*
pad *

kernel 
conv6_1/expconv6_1/exp"Relug
conv6_1/exp
conv6_1/dw_w
conv6_1/dw_b
conv6_1/dw"Conv*

stride*
pad*

kernel*	
group

conv6_1/dw
conv6_1/dw"Relug

conv6_1/dw
conv6_1/linear_w
conv6_1/linear_bconv6_1/linear"Conv*

stride*
pad *

kernelb
conv6_1/linear
conv6_2/exp_w
conv6_2/exp_bconv6_2/exp"Conv*

stride*
pad *

kernel 
conv6_2/expconv6_2/exp"Relug
conv6_2/exp
conv6_2/dw_w
conv6_2/dw_b
conv6_2/dw"Conv*

stride*
pad*

kernel*	
group

conv6_2/dw
conv6_2/dw"Relug

conv6_2/dw
conv6_2/linear_w
conv6_2/linear_bconv6_2/linear"Conv*

stride*
pad *

kernel<
conv6_2/linearscore"ResizeLinear*	
width@*

height@:data:conv2_1/exp_w:conv2_1/exp_b:conv2_1/dw_w:conv2_1/dw_b:conv2_1/linear_w:conv2_1/linear_b:conv2_2/exp_w:conv2_2/exp_b:conv2_2/dw_w:conv2_2/dw_b:conv2_2/linear_w:conv2_2/linear_b:conv3_1/exp_w:conv3_1/exp_b:conv3_1/dw_w:conv3_1/dw_b:conv3_1/linear_w:conv3_1/linear_b:conv3_2/exp_w:conv3_2/exp_b:conv3_2/dw_w:conv3_2/dw_b:conv3_2/linear_w:conv3_2/linear_b:conv3_3/exp_w:conv3_3/exp_b:conv3_3/dw_w:conv3_3/dw_b:conv3_3/linear_w:conv3_3/linear_b:conv4_1_reduce_w:conv4_1_reduce_b:conv4_1_dw_w:conv4_1_dw_b:conv4_1_linear_w:conv4_1_linear_b:conv4_2_reduce_w:conv4_2_reduce_b:conv4_2_dw_w:conv4_2_dw_b:conv4_2_linear_w:conv4_2_linear_b:conv4_3_reduce_w:conv4_3_reduce_b:conv4_3_dw_w:conv4_3_dw_b:conv4_3_linear_w:conv4_3_linear_b:conv5_1_reduce_w:conv5_1_reduce_b:conv5_1_dw_w:conv5_1_dw_b:conv5_2_reduce_w:conv5_2_reduce_b:conv5_2_dw_w:conv5_2_dw_b:conv5_3_reduce_w:conv5_3_reduce_b:conv5_3_dw_w:conv5_3_dw_b:conv6_1/exp_w:conv6_1/exp_b:conv6_1/dw_w:conv6_1/dw_b:conv6_1/linear_w:conv6_1/linear_b:conv6_2/exp_w:conv6_2/exp_b:conv6_2/dw_w:conv6_2/dw_b:conv6_2/linear_w:conv6_2/linear_bBscore