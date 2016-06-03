package se0965.vtth.com.android.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.squareup.picasso.Picasso;

import java.util.List;

import se0965.vtth.com.android.R;
import se0965.vtth.com.android.manager.FoodManager;
import se0965.vtth.com.android.model.Food;

/**
 * Created by SONY on 5/28/2016.
 */
public class BookmarkAdapter extends BaseAdapter {

    public static final int LAYOUT_RESOURCE_ID = R.id.search_result_lv;

    private List<Food> list;
    private Context context;
    private static LayoutInflater inflater = null;
    private FoodManager manager;

    public BookmarkAdapter(Context context, List<Food> foods) {
        this.list = foods;
        this.context = context;
        inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
    }

    @Override
    public int getCount() {
        return list.size();
    }

    @Override
    public Object getItem(int position) {
        return list.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(final int position, View convertView, ViewGroup viewGroup) {
        ViewHolder viewHolder = null;
        if (convertView == null) {
            convertView = inflater.inflate(R.layout.item_bookmark, null);
            viewHolder = new ViewHolder(convertView);
            convertView.setTag(viewHolder);

        } else {
            viewHolder = (ViewHolder) convertView.getTag();
        }
        final Food food = (Food) getItem(position);
        Picasso.with(context).load(food.getImages())
                .placeholder(R.drawable.loading)
                .error(R.drawable.ic_error)
                .into(viewHolder.ivThumb);
        viewHolder.tvName.setText(food.getFoodName());
        String detail = food.getDescription().substring(0, 50) + "...";
        viewHolder.tvDetails.setText(detail);
        viewHolder.ivDelete.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                manager = new FoodManager(view.getContext());
                manager.deleteById(list.get(position).getFoodId());
                list.remove(position);
                notifyDataSetChanged();
            }
        });
        return convertView;
    }


    public class ViewHolder {
        ImageView ivThumb, ivDelete;
        TextView tvName, tvDetails;

        public ViewHolder(View v) {
            ivThumb = (ImageView) v.findViewById(R.id.item_boorkmark_thumb_iv);
            tvName = (TextView) v.findViewById(R.id.item_boorkmark_name_tv);
            tvDetails = (TextView) v.findViewById(R.id.item_boorkmark_material_tv);
            ivDelete= (ImageView) v.findViewById(R.id.item_boorkmark_delete_iv);
        }
    }
}
